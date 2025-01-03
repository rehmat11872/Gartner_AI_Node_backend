import mongoose from 'mongoose';

const OrganizationSchema = new mongoose.Schema({
  organizationId: { type: String, required: true },
  organizationName: { type: String, required: true },
  organizationMission: { type: String },
  organizationApproach: { type: String },
  organizationAnnualBudget: { type: Number },
  organizationWebsite: { type: String },
  // organizationContact: {
  //   contactName: { type: String },
  //   contactEmail: { type: String },
  //   contactPhone: { type: String },
  // },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Organization', OrganizationSchema);
