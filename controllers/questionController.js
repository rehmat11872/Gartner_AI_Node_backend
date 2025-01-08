import Question from '../models/question.js';


export const submitQuestions = async (req, res) => {
    const { questions, grantId } = req.body;
    try {
        const question = new Question({ questions, grantId, submittedBy: req.user._id });
        await question.save();
        res.status(201).json(question);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
