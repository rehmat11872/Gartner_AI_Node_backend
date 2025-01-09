
import express from 'express';
import authenticate from '../middleware/authenticate.js';
import { createGrant, getAllGrants, getGrantById } from '../controllers/grantController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Grants
 *   description: Grant management APIs
 */

/**
 * @swagger
 * /api/grants:
 *   post:
 *     summary: Create a new grant
 *     tags: [Grants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: New Grant
 *               description:
 *                 type: string
 *                 example: Grant description here
 *     responses:
 *       201:
 *         description: Grant created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, createGrant);

/**
 * @swagger
 * /api/grants:
 *   get:
 *     summary: Get all grants
 *     tags: [Grants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched grants
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, getAllGrants);

/**
 * @swagger
 * /api/grants/{id}:
 *   get:
 *     summary: Get grant by ID
 *     tags: [Grants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Grant ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched grant
 *       404:
 *         description: Grant not found
 */
router.get('/:id', authenticate, getGrantById);

export default router;
