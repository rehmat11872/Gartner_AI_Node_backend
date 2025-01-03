import mongoose from 'mongoose';

const FunderSchema = new mongoose.Schema({
  funderId: { type: String, required: true },
  funderName: { type: String, required: true },
  funderMission: { type: String },
  funderType: { type: String, enum: ['Foundation', 'Corporate', 'Government'] },
  funderGeographicFocus: [{ type: String }], // Array of regions or countries
  contact: {
    contactName: { type: String },
    contactEmail: { type: String },
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links to the user who created this funder
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Funder', FunderSchema);
