const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const PLANS = {
  monthly: {
    priceId: process.env.STRIPE_PRICE_ID_MONTHLY,
    name: 'Monthly Premium',
    interval: 'month',
    price: 999,
  },
  yearly: {
    priceId: process.env.STRIPE_PRICE_ID_YEARLY,
    name: 'Yearly Premium',
    interval: 'year',
    price: 9999,
  },
};

module.exports = {
  stripe,
  PLANS,
};
