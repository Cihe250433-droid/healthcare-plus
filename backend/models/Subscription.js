const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    planName: {
      type: String,
      enum: ['Basic Care', 'Premium Care', 'Family Care'],
      required: true
    },
    monthlyFee: {
      type: Number,
      required: true
    },
    billingCycle: {
      type: String,
      enum: ['Monthly', 'Quarterly', 'Yearly'],
      default: 'Monthly'
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending', 'Overdue'],
      default: 'Pending'
    },
    subscriptionStatus: {
      type: String,
      enum: ['Active', 'Cancelled', 'Expired'],
      default: 'Active'
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);