const mongoose = require('mongoose');

const GrantSchema = new mongoose.Schema({
  grantId: { type: String, required: true },
  grantTitle: { type: String, required: true },
  grantAmountRequested: { type: Number },
  grantPurpose: { type: String },
  grantApproach: { type: String },
  organizationId: { type: String, required: true },
  grantStatusOptions: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Awarded', 'Declined'],
  },
  submissionDeadline: { type: Date },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Grant', GrantSchema);
