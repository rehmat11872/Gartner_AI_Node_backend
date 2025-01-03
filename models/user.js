import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { type: String, required: true },
  accountType: { type: String, enum: ['Basic', 'Professional'], default: 'Basic' },
  creditBalance: { type: Number, default: 0 },
  subscription: {
    tier: { type: String, enum: ['Basic', 'Professional'], default: 'Basic' },
    status: { type: String, enum: ['active', 'inactive', 'canceled'], default: 'active' },
    stripeCustomerId: { type: String },
  },
  organization_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }], // Linking user to organizations
  funder_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Funder' }, // Optional funder link
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
