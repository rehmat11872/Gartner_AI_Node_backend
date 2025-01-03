import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  grantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Grant', required: true }, // Links the question to a specific grant
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Tracks which user owns this question
  questionText: { type: String, required: true }, // The text of the question
  response: {
    responseText: { type: String }, // AI-generated or user-modified response
    wordCount: { type: Number, default: 0 }, // Word count of the response
    characterCount: { type: Number, default: 0 }, // Character count of the response
    lastUpdated: { type: Date, default: Date.now }, // Timestamp for the latest update
  },
  characterLimit: { type: Number, default: 2000 }, // Optional limit for the character count
  createdAt: { type: Date, default: Date.now }, // When the question was created
  updatedAt: { type: Date, default: Date.now }, // Last update timestamp
});

module.exports = mongoose.model('Question', QuestionSchema);
