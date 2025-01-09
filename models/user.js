import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { type: String, required: true },
  accountType: { type: String, enum: ['Basic', 'Professional'], default: 'Basic' },
  creditBalance: { type: Number, default: 0 },
  subscription: {
    tier: { type: String, enum: ['Basic', 'Professional'], default: 'Basic' },
    status: { type: String, enum: ['active', 'inactive', 'canceled'], default: 'inactive' },
    stripeCustomerId: { type: String },
  },
  organization_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }], // Linking user to organizations
  funder_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Funder' }],
  onboardingStatus: {
    type: String,
    enum: ['incomplete', 'account_type_selected', 'organization_created', 'funder_created', 'complete'],
    default: 'incomplete',
  },
  hasCreatedOrganization: { type: Boolean, default: false },
  hasCreatedFunder: { type: Boolean, default: false }, // Optional
  // funder_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Funder' }, // Optional funder link
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const User = mongoose.model('User', UserSchema);

export default User;