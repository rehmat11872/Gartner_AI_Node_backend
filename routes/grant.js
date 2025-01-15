import express from 'express';
import authenticate from '../middleware/authenticate.js';
import {
  createGrant,
  getAllGrants,
  getGrantById,
  deleteGrant,
} from '../controllers/grantController.js';

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
 *                 example: Grant Title
 *               description:
 *                 type: string
 *                 example: Grant description here
 *               organizationId:
 *                 type: string
 *                 example: 64b67f8c7c2d1e3f0b123456
 *               funderId:
 *                 type: string
 *                 example: 64b67f8c7c2d1e3f0b654321
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-01-31T23:59:59.999Z
 *     responses:
 *       201:
 *         description: Grant created successfully
 *       400:
 *         description: Invalid input
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

/**
 * @swagger
 * /api/grants/{id}:
 *   delete:
 *     summary: Delete a grant
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
 *         description: Successfully deleted grant
 *       404:
 *         description: Grant not found
 */
router.delete('/:id', authenticate, deleteGrant);

export default router;
