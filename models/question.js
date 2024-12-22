const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  questions: [
    {
      questionId: { type: String, required: true },
      questionText: { type: String, required: true },
      grantId: { type: String },
      response: {
        responseId: { type: String, required: true },
        responseText: { type: String },
        wordCount: { type: Number },
        characterCount: { type: Number },
      },
      responseHistory: [
        {
          versionId: { type: String },
          responseText: { type: String },
          wordCount: { type: Number },
          characterCount: { type: Number },
          timestamp: { type: Date },
        },
      ],
      lastUpdated: { type: Date, default: Date.now },
    },
  ],
  characterLimit: { type: Number, default: 2000 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', QuestionSchema);