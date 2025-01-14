import express from 'express';
import { submitQuestion } from '../controllers/aiResponseController.js';

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

export default router;
