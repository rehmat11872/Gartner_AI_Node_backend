import express from 'express';
import { submitQuestion, listAIResponses, getResponsesByUserAndGrant } from '../controllers/aiResponseController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AI Response
 *   description: API for generating AI responses to grant-related questions.
 */

/**
 * @swagger
 * /api/ai/response:
 *   post:
 *     summary: Generate an AI response to a user’s grant-related question.
 *     tags: [AI Response]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user submitting the question.
 *                 example: "64a67c8b2e9e4b6e4f0b1234"
 *               grantId:
 *                 type: string
 *                 description: The ID of the grant associated with the question.
 *                 example: "64a67c8b2e9e4b6e4f0b5678"
 *               questionText:
 *                 type: string
 *                 description: The text of the question to ask OpenAI.
 *                 example: "How can this grant support sustainable development goals?"
 *               tone:
 *                 type: string
 *                 description: Optional tone for the AI response.
 *                 example: "Professional and persuasive"
 *               guidelines:
 *                 type: string
 *                 description: Optional guidelines for the AI response.
 *                 example: "Focus on grant-specific requirements and use concise language."
 *     responses:
 *       200:
 *         description: AI response generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Response generated successfully."
 *                 response:
 *                   type: string
 *                   description: AI-generated response.
 *                   example: "This grant supports sustainable development goals by funding..."
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: User or grant not found.
 *       500:
 *         description: Server error.
 */
router.post('/', submitQuestion);

/**
 * @swagger
 * /api/ai/responses:
 *   get:
 *     summary: Get all AI responses with user and grant details.
 *     tags: [AI Response]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched AI responses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64a67c8b2e9e4b6e4f0b5678"
 *                   questionText:
 *                     type: string
 *                     example: "How can this grant support sustainable development goals?"
 *                   response:
 *                     type: object
 *                     properties:
 *                       responseText:
 *                         type: string
 *                         example: "This grant supports sustainable development goals by funding..."
 *                       wordCount:
 *                         type: number
 *                         example: 20
 *                       characterCount:
 *                         type: number
 *                         example: 150
 *                   userId:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                   grantId:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "Sustainability Grant"
 *       404:
 *         description: No AI responses found.
 *       500:
 *         description: Server error.
 */
router.get('/responses', authenticate, listAIResponses);


/**
 * @swagger
 * /api/ai/responses/{userId}/{grantId}:
 *   get:
 *     summary: Get AI responses for a specific user and grant.
 *     tags: [AI Response]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user.
 *         schema:
 *           type: string
 *       - in: path
 *         name: grantId
 *         required: true
 *         description: The ID of the grant.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched AI responses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64a67c8b2e9e4b6e4f0b5678"
 *                   questionText:
 *                     type: string
 *                     example: "How can this grant support sustainable development goals?"
 *                   response:
 *                     type: object
 *                     properties:
 *                       responseText:
 *                         type: string
 *                         example: "This grant supports sustainable development goals by funding..."
 *                       wordCount:
 *                         type: number
 *                         example: 20
 *                       characterCount:
 *                         type: number
 *                         example: 150
 *                   userId:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                   grantId:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "Sustainability Grant"
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: No responses found.
 *       500:
 *         description: Server error.
 */
router.get('/responses/:userId/:grantId', authenticate, getResponsesByUserAndGrant);


export default router;
