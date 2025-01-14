import { Configuration, OpenAIApi } from 'openai';
import Question from '../models/question.js';
import Grant from '../models/grant.js';
import User from '../models/user.js';

// Initialize OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const submitQuestion = async (req, res) => {
    const { userId, grantId, questionText, tone, guidelines } = req.body;

    try {
        // Validate inputs
        if (!userId || !grantId || !questionText) {
            return res.status(400).json({ message: 'User ID, Grant ID, and Question are required.' });
        }

        // Fetch user and grant for context
        const user = await User.findById(userId);
        const grant = await Grant.findById(grantId);

        if (!user || !grant) {
            return res.status(404).json({ message: 'User or Grant not found.' });
        }

        // Create the prompt
        const prompt = {
            organizationData: {
                organizationName: grant.organizationId.organizationName,
                organizationDetails: grant.organizationId.organizationDetails,
            },
            funderData: grant.funderId
                ? {
                    funderName: grant.funderId.funderName,
                    funderDetails: grant.funderId.funderDetails,
                }
                : null,
            questions: questionText,
            suggestions: tone ? [tone] : [], // Include tone if provided
            guidelines: guidelines || '', // Include guidelines if provided
        };

        // Call OpenAI API
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a grant-writing assistant. Help users craft compelling, data-driven grant proposals. Focus on clarity, professionalism, and aligning with funding priorities.',
                },
                { role: 'user', content: JSON.stringify(prompt) },
            ],
            max_tokens: 1000, // Limit the response length
        });

        const aiResponse = response.data.choices[0].message.content;

        // Save the question and response to the database
        const question = new Question({
            grantId,
            userId,
            questionText,
            response: {
                responseText: aiResponse,
                wordCount: aiResponse.split(' ').length,
                characterCount: aiResponse.length,
            },
        });
        await question.save();

        // Return the response
        res.status(200).json({
            message: 'Response generated successfully.',
            response: aiResponse,
        });
    } catch (error) {
        console.error('Error submitting question:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
