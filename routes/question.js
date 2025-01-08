import express from 'express';
import { submitQuestions } from '../controllers/questionController.js';
import authenticate from '../middleware/authenticate.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: APIs for managing questions
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Submit questions for a grant
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grantId:
 *                 type: string
 *                 example: 64d9f0b3e3246d1f26b8cd91
 *               questions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["What is the project budget?", "What is the project timeline?"]
 *     responses:
 *       201:
 *         description: Questions submitted successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, submitQuestions);

export default router;
