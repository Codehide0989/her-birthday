import { useState, useEffect } from 'react';
import { Check, Zap } from 'lucide-react';
import { subscriptionAPI } from '../services/api';
import useAuthStore from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const SubscriptionPage = () => {
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await subscriptionAPI.getSubscription();
      setCurrentSubscription(response.data.data.subscription);
    } catch (error) {
      console.error('Failed to fetch subscription');
    }
  };

  const handleSubscribe = async (planType) => {
    setLoading(true);
    try {
      const response = await subscriptionAPI.createCheckoutSession(planType);
      window.location.href = response.data.data.url;
    } catch (error) {
      toast.error('Failed to create checkout session');
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return;

    try {
      await subscriptionAPI.cancelSubscription();
      toast.success('Subscription will be cancelled at the end of the billing period');
      fetchSubscription();
    } catch (error) {
      toast.error('Failed to cancel subscription');
    }
  };

  const plans = [
    {
      name: 'Monthly',
      type: 'monthly',
      price: '$9.99',
      period: '/month',
      description: 'Perfect for trying out premium features',
      features: [
        'Access to all premium courses',
        'Unlimited video streaming',
        'Download course materials',
        'Priority support',
        'Interactive 3D content',
        'Progress tracking',
      ],
    },
    {
      name: 'Yearly',
      type: 'yearly',
      price: '$99.99',
      period: '/year',
      description: 'Best value - Save 17%',
      popular: true,
      features: [
        'Everything in Monthly',
        'Save $20 per year',
        'Exclusive yearly bonuses',
        'Early access to new courses',
        'Dedicated account manager',
        'Offline access',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Choose Your Plan</h1>
        <p className="text-gray-600">
          {user?.subscriptionStatus === 'trial'
            ? 'Upgrade to premium to continue after your trial'
            : 'Select the perfect plan for your learning journey'}
        </p>
      </div>

      {user?.subscriptionStatus === 'trial' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-sketch bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-primary-200 text-center"
        >
          <Zap className="w-12 h-12 text-primary-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-2">You're on a Free Trial</h3>
          <p className="text-gray-600">
            Enjoying StudySphere? Upgrade now to keep learning without interruption.
          </p>
        </motion.div>
      )}

      {currentSubscription?.status === 'active' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-sketch bg-green-50 border-2 border-green-200"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Active Subscription
              </h3>
              <p className="text-gray-600">
                Your {currentSubscription.planType} plan is active until{' '}
                {new Date(currentSubscription.expiryDate).toLocaleDateString()}
              </p>
            </div>
            {!currentSubscription.cancelAtPeriodEnd && (
              <button
                onClick={handleCancelSubscription}
                className="px-4 py-2 text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Cancel Plan
              </button>
            )}
          </div>
          {currentSubscription.cancelAtPeriodEnd && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-yellow-800 text-sm">
                Your subscription will end on{' '}
                {new Date(currentSubscription.expiryDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card-sketch relative ${
              plan.popular ? 'border-4 border-primary-400 shadow-2xl' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
              <div className="flex items-end justify-center">
                <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                <span className="text-gray-600 mb-2">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.type)}
              disabled={loading || currentSubscription?.planType === plan.type}
              className={`w-full btn-sketch ${
                plan.popular ? 'bg-gradient-to-r from-primary-600 to-purple-600' : ''
              } ${
                currentSubscription?.planType === plan.type
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              {currentSubscription?.planType === plan.type
                ? 'Current Plan'
                : loading
                ? 'Loading...'
                : 'Get Started'}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto card-sketch bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
            <p className="text-gray-600 text-sm">
              Yes! You can cancel your subscription at any time. You'll continue to have access
              until the end of your billing period.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
            <p className="text-gray-600 text-sm">
              We accept all major credit cards, debit cards, and other payment methods through
              Stripe.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Is there a refund policy?</h4>
            <p className="text-gray-600 text-sm">
              We offer a 30-day money-back guarantee. If you're not satisfied, contact our
              support team for a full refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
