import { Configuration, OpenAIApi } from 'openai';
import Question from '../models/question.js';
import Organization from '../models/organization.js';
import Funder from '../models/funder.js';
import User from '../models/user.js';

// Initialize OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const submitQuestion = async (req, res) => {
    const { userId, organizationId, funderId, questionText, tone, guidelines } = req.body;

    try {
        // Validate inputs
        if (!userId || !organizationId || !questionText) {
            return res.status(400).json({ message: 'User ID, Organization ID, and Question are required.' });
        }

        // Fetch user, organization, and funder for context
        const user = await User.findById(userId);
        const organization = await Organization.findById(organizationId);
        const funder = funderId ? await Funder.findById(funderId) : null;

        if (!user || !organization) {
            return res.status(404).json({ message: 'User or Organization not found.' });
        }

        // Create the prompt
        const prompt = {
            organizationData: {
                organizationName: organization.organizationName,
                organizationDetails: organization.organizationDetails,
            },
            funderData: funder
                ? {
                    funderName: funder.funderName,
                    funderDetails: funder.funderDetails,
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
            userId,
            questionText,
            response: {
                responseText: aiResponse,
                wordCount: aiResponse.split(' ').length,
                characterCount: aiResponse.length,
            },
        });

        if (organizationId) question.organizationId = organizationId;
        if (funderId) question.funderId = funderId;

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



export const listAIResponses = async (req, res) => {
    try {
        // Fetch all questions with related user and grant details
        const responses = await Question.find()
            .populate('userId', 'email') // Include user email
            .populate('grantId', 'title'); // Include grant title

        // Check if there are any responses
        if (responses.length === 0) {
            return res.status(404).json({ message: 'No AI responses found.' });
        }

        // Return responses
        res.status(200).json(responses);
    } catch (error) {
        console.error('Error fetching AI responses:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


export const getResponsesByUserAndGrant = async (req, res) => {
    const { userId, grantId } = req.params;

    try {
        // Validate inputs
        if (!userId || !grantId) {
            return res.status(400).json({ message: 'User ID and Grant ID are required.' });
        }

        // Find questions matching userId and grantId
        const responses = await Question.find({ userId, grantId })
            .populate('userId', 'email') // Include user's email
            .populate('grantId', 'title'); // Include grant's title

        // Check if responses exist
        if (!responses.length) {
            return res.status(404).json({ message: 'No responses found for the given user and grant.' });
        }

        // Return the responses
        res.status(200).json(responses);
    } catch (error) {
        console.error('Error fetching responses:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
