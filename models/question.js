const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    questions: [{ type: String, required: true }],
    grantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Grant', required: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
module.exports = mongoose.model('Question', QuestionSchema);