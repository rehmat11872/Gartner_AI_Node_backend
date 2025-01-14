import { Configuration, OpenAIApi } from 'openai';

// Initialize OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this is stored securely
});
const openai = new OpenAIApi(configuration);

// System prompt for consistent behavior
const SYSTEM_PROMPT = `
You are a grant-writing assistant. Help users craft compelling, data-driven grant proposals. 
Focus on clarity, professionalism, and aligning with funding priorities.
`;

/**
 * Generate a response from OpenAI
 * @param {Object} userPrompt - User-specific inputs for OpenAI
 * @returns {string} - AI-generated response
 */
export const generateAIResponse = async (userPrompt) => {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: JSON.stringify(userPrompt) },
            ],
            max_tokens: 1000, // Limit response length
        });

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw new Error('Failed to generate response from OpenAI.');
    }
};


import { generateAIResponse } from '../utils/openaiUtils.js';
import Question from '../models/question.js';

/**
 * Handle question submission and generate AI response
 */
export const submitQuestion = async (req, res) => {
    const { userId, grantId, questionText, tone, guidelines } = req.body;

    try {
        // Validate required fields
        if (!userId || !grantId || !questionText) {
            return res.status(400).json({ message: 'User ID, Grant ID, and Question are required.' });
        }

        // Prepare the user prompt
        const userPrompt = {
            questions: questionText,
            suggestions: tone ? [tone] : [],
            guidelines: guidelines || '',
        };

        // Generate AI response
        const aiResponse = await generateAIResponse(userPrompt);

        // Save the question and response in the database
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

        // Send response back to the client
        res.status(200).json({
            message: 'Response generated successfully.',
            response: aiResponse,
        });
    } catch (error) {
        console.error('Error submitting question:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
