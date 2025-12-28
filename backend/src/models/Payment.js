const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
      default: null,
    },
    stripePaymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },
    stripeInvoiceId: {
      type: String,
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'usd',
      uppercase: true,
    },
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed', 'refunded', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'bank_transfer', 'wallet'],
      default: 'card',
    },
    cardBrand: {
      type: String,
      default: null,
    },
    cardLast4: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    receiptUrl: {
      type: String,
      default: null,
    },
    refundedAmount: {
      type: Number,
      default: 0,
    },
    refundedAt: {
      type: Date,
      default: null,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ stripePaymentIntentId: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
