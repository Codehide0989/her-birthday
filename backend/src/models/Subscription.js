const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    planType: {
      type: String,
      enum: ['monthly', 'yearly'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired', 'past_due'],
      default: 'active',
    },
    stripeSubscriptionId: {
      type: String,
      required: true,
      unique: true,
    },
    stripePriceId: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    autoRenew: {
      type: Boolean,
      default: true,
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
    currentPeriodStart: {
      type: Date,
      required: true,
    },
    currentPeriodEnd: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

subscriptionSchema.index({ userId: 1, status: 1 });

subscriptionSchema.methods.isActive = function () {
  return this.status === 'active' && this.expiryDate > new Date();
};

subscriptionSchema.methods.cancel = function (immediately = false) {
  if (immediately) {
    this.status = 'cancelled';
    this.cancelledAt = new Date();
    this.expiryDate = new Date();
  } else {
    this.cancelAtPeriodEnd = true;
    this.autoRenew = false;
  }
};

module.exports = mongoose.model('Subscription', subscriptionSchema);
