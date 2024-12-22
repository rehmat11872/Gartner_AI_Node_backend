const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  organizationId: { type: String, required: true },
  organizationName: { type: String, required: true },
  organizationMission: { type: String },
  organizationApproach: { type: String },
  organizationAnnualBudget: { type: Number },
  organizationWebsite: { type: String },
  organizationContact: {
    contactName: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
  },
  organizationAddress: {
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  organizationStaff: [
    {
      staffId: { type: String },
      staffName: { type: String },
      staffRole: { type: String },
      staffBio: { type: String },
      staffEmail: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Organization', OrganizationSchema);
