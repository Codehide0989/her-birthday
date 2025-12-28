const { stripe, PLANS } = require('../config/stripe');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const Payment = require('../models/Payment');

const createCheckoutSession = async (req, res) => {
  try {
    const { planType } = req.body;

    if (!PLANS[planType]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid plan type',
      });
    }

    const user = await User.findById(req.user.id);

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user._id.toString(),
        },
      });

      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: PLANS[planType].priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscription/cancel`,
      metadata: {
        userId: user._id.toString(),
        planType,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.user.id,
      status: 'active',
    });

    res.status(200).json({
      success: true,
      data: { subscription },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.user.id,
      status: 'active',
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found',
      });
    }

    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    subscription.cancel(false);
    await subscription.save();

    res.status(200).json({
      success: true,
      message: 'Subscription will be cancelled at the end of the billing period',
      data: { subscription },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      data: { payments },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
};

async function handleCheckoutCompleted(session) {
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription
  );

  const user = await User.findOne({ stripeCustomerId: session.customer });

  if (user) {
    user.subscriptionStatus = 'active';
    await user.save();

    await Subscription.create({
      userId: user._id,
      planType: session.metadata.planType,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      startDate: new Date(subscription.start_date * 1000),
      expiryDate: new Date(subscription.current_period_end * 1000),
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      status: 'active',
    });
  }
}

async function handlePaymentSucceeded(invoice) {
  const user = await User.findOne({ stripeCustomerId: invoice.customer });

  if (user) {
    await Payment.create({
      userId: user._id,
      stripePaymentIntentId: invoice.payment_intent,
      stripeInvoiceId: invoice.id,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: 'succeeded',
      receiptUrl: invoice.hosted_invoice_url,
      paidAt: new Date(invoice.status_transitions.paid_at * 1000),
    });
  }
}

async function handlePaymentFailed(invoice) {
  const user = await User.findOne({ stripeCustomerId: invoice.customer });

  if (user) {
    user.subscriptionStatus = 'past_due';
    await user.save();

    const subscription = await Subscription.findOne({
      userId: user._id,
      stripeSubscriptionId: invoice.subscription,
    });

    if (subscription) {
      subscription.status = 'past_due';
      await subscription.save();
    }
  }
}

async function handleSubscriptionDeleted(subscription) {
  const dbSubscription = await Subscription.findOne({
    stripeSubscriptionId: subscription.id,
  });

  if (dbSubscription) {
    dbSubscription.status = 'cancelled';
    dbSubscription.cancelledAt = new Date();
    await dbSubscription.save();

    const user = await User.findById(dbSubscription.userId);
    if (user) {
      user.subscriptionStatus = 'cancelled';
      await user.save();
    }
  }
}

async function handleSubscriptionUpdated(subscription) {
  const dbSubscription = await Subscription.findOne({
    stripeSubscriptionId: subscription.id,
  });

  if (dbSubscription) {
    dbSubscription.currentPeriodStart = new Date(
      subscription.current_period_start * 1000
    );
    dbSubscription.currentPeriodEnd = new Date(
      subscription.current_period_end * 1000
    );
    dbSubscription.expiryDate = new Date(
      subscription.current_period_end * 1000
    );
    dbSubscription.status = subscription.status;
    await dbSubscription.save();
  }
}

module.exports = {
  createCheckoutSession,
  getSubscription,
  cancelSubscription,
  getPaymentHistory,
  handleWebhook,
};
