const express = require('express');
const {
  createCheckoutSession,
  getSubscription,
  cancelSubscription,
  getPaymentHistory,
  handleWebhook,
} = require('../controllers/subscriptionController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

router.use(protect);

router.post('/create-checkout-session', createCheckoutSession);
router.get('/current', getSubscription);
router.post('/cancel', cancelSubscription);
router.get('/payments', getPaymentHistory);

module.exports = router;
