const mongoose = require('mongoose');

const FunderSchema = new mongoose.Schema({
  funderId: { type: String, required: true },
  funderName: { type: String, required: true },
  funderMission: { type: String },
  funderType: { type: String, enum: ['Foundation', 'Corporate', 'Government'] },
  funderGeographicFocus: [{ type: String }],
  applicationDetails: {
    applicationDeadline: { type: Date },
  },
  contact: {
    contactName: { type: String },
    contactEmail: { type: String },
  },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Funder', FunderSchema);
