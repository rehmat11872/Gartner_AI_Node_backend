const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true,  match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { type: String, required: true },
  accountType: { type: String, enum: ['Basic', 'Premium'], default: 'Basic' },
  creditBalance: { type: Number, default: 0 },
  engagementMetrics: {
    lastActivity: { type: Date },
    sessionDuration: { type: Number },
  },
  feedbackResponses: [{ type: String }],
  deviceInfo: {
    deviceType: { type: String },
    operatingSystem: { type: String },
  },
  stripeCustomerId: { type: String },
  transactionHistory: [
    {
      amount: { type: Number },
      timestamp: { type: Date },
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
