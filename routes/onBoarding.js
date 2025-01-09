import express from 'express';
import completeOnboarding from '../controllers/onboardingController.js';
import authenticate from '../middleware/authenticate.js';
import selectAccountType from '../controllers/selectAccountTypeController.js';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Onboarding
 *   description: onBoarding management APIs
 */


/**
 * @swagger
 * /api/onboarding/complete:
 *   post:
 *     summary: Complete the onboarding process for the user
 *     description: Completes the user's onboarding by checking the organization creation and handling optional funder creation.
 *     tags:
 *       - Onboarding
 *     security:
 *       - bearerAuth: []  # Requires JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "677f8ccc4716f8ddbf3d73da"
 *               funderDetails:
 *                 type: object
 *                 required:
 *                   - funderName
 *                   - funderType
 *                   - createdBy
 *                 properties:
 *                   funderName:
 *                     type: string
 *                     example: "Global Health Fund"
 *                   funderMission:
 *                     type: string
 *                     example: "Improving healthcare worldwide"
 *                   funderType:
 *                     type: string
 *                     enum:
 *                       - Foundation
 *                       - Corporate
 *                       - Government
 *                     example: "Foundation"
 *                   funderGeographicFocus:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["USA", "Global"]
 *                   contact:
 *                     type: object
 *                     properties:
 *                       contactName:
 *                         type: string
 *                         example: "John Doe"
 *                       contactEmail:
 *                         type: string
 *                         example: "john_doe@gmail.com"
 *     responses:
 *       200:
 *         description: Onboarding completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Onboarding completed successfully. You can now access the dashboard."
 *       400:
 *         description: Bad request, organization not created
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/complete', authenticate, completeOnboarding);  // Use authenticate middleware to secure the route





/**
 * @swagger
 * /api/onboarding/account/type:
 *   post:
 *     summary: Select an account type for the user
 *     description: This endpoint allows the user to select an account type (e.g., "Basic" or "Professional") during onboarding.
 *     tags: [Onboarding]
 *     security:
 *       - bearerAuth: []  # Requires JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - accountType
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "677f8ccc4716f8ddbf3d73da"
 *               accountType:
 *                 type: string
 *                 enum: [Basic, Professional]
 *                 example: "Basic"
 *     responses:
 *       200:
 *         description: Account type selected successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */


router.post('/account/type', authenticate, selectAccountType);  // Use authenticate middleware to secure the route




export default router;