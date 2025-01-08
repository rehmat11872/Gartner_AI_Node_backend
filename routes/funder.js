import express from 'express';
import { createFunder, getFunders, getFunderById, updateFunder, deleteFunder } from '../controllers/funderController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Funder
 *   description: Funder management API
 */

/**
 * @swagger
 * /funder/create:
 *   post:
 *     summary: Create a new Funder
 *     tags: [Funder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - funderName
 *               - funderType
 *               - createdBy
 *             properties:
 *               funderName:
 *                 type: string
 *                 example: "Global Health Fund"
 *               funderMission:
 *                 type: string
 *                 example: "Improving healthcare worldwide"
 *               funderType:
 *                 type: string
 *                 enum: [Foundation, Corporate, Government]
 *                 example: "Foundation"
 *               funderGeographicFocus:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["USA", "Global"]
 *               contact:
 *                 type: object
 *                 properties:
 *                   contactName:
 *                     type: string
 *                     example: "John Doe"
 *                   contactEmail:
 *                     type: string
 *                     example: "john_doe@gmail.com"
 *     responses:
 *       201:
 *         description: Funder created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Funder created successfully."
 *                 funderId:
 *                   type: string
 *                   example: "abc123"
 *       400:
 *         description: Invalid input or missing required fields
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.post('/create', createFunder);

/**
 * @swagger
 * /funder/list:
 *   get:
 *     summary: Get all funders
 *     tags: [Funder]
 *     responses:
 *       200:
 *         description: List of funders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   funderId:
 *                     type: string
 *                   funderName:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/list', getFunders);

/**
 * @swagger
 * /funder/list/{id}:
 *   get:
 *     summary: Get a funder by ID
 *     tags: [Funder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The funder ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The funder details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 funderId:
 *                   type: string
 *                 funderName:
 *                   type: string
 *       404:
 *         description: Funder not found
 *       500:
 *         description: Internal server error
 */
router.get('/list/:id', getFunderById);

/**
 * @swagger
 * /funder/update/{id}:
 *   put:
 *     summary: Update a funder by ID
 *     tags: [Funder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The funder ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               funderName:
 *                 type: string
 *                 example: "Updated Global Health Fund"
 *               funderMission:
 *                 type: string
 *                 example: "Improving healthcare worldwide with additional support."
 *               funderWebsite:
 *                 type: string
 *                 example: "https://www.updatedhealth.org"
 *     responses:
 *       200:
 *         description: Funder updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Funder updated successfully."
 *       404:
 *         description: Funder not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', updateFunder);

/**
 * @swagger
 * /funder/delete/{id}:
 *   delete:
 *     summary: Delete a funder by ID
 *     tags: [Funder]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The funder ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Funder deleted successfully
 *       404:
 *         description: Funder not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', deleteFunder);

export default router;
