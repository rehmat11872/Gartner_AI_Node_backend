import mongoose from 'mongoose';

const GrantSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true }, // Grant title
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, // Links the grant to an organization
  funderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Funder' }, // Optional link to a funder
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user who created the grant
  dueDate: { type: Date, required: true }, // Grant application deadline
  status: { type: String, enum: ['Draft', 'Submitted', 'Under Review', 'Awarded', 'Declined'], default: 'Draft' }, // Grant status
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], // References to questions associated with this grant
  guidelines: { type: String }, // Grant-specific guidelines or instructions
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Grant', GrantSchema);
