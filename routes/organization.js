import express from 'express';
import { createOrganization, getOrganizations, getOrganizationById, updateOrganization, deleteOrganization } from '../controllers/organizationController.js';
import  authenticate  from '../middleware/authenticate.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: API for managing organizations
 */

/**
 * @swagger
 * /api/organization/create:
 *   post:
 *     summary: Create a new Organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []  # This line requires the token to be passed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - organizationName
 *               - createdBy
 *             properties:
 *               organizationName:
 *                 type: string
 *                 example: "Global Health Initiative"
 *               organizationMission:
 *                 type: string
 *                 example: "To promote global health and wellness."
 *               organizationApproach:
 *                 type: string
 *                 example: "Collaborating with local health providers and government organizations."
 *               organizationAnnualBudget:
 *                 type: number
 *                 example: 1000000
 *               organizationWebsite:
 *                 type: string
 *                 example: "https://www.globalhealth.org"
 *     responses:
 *       201:
 *         description: Organization created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Organization created successfully."
 *                 organizationId:
 *                   type: string
 *                   example: "60b8c1a2f8d7b834d5d5f25f"
 *       400:
 *         description: Invalid input or missing required fields
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.post('/create', authenticate, createOrganization);

/**
 * @swagger
 * /api/organization/list:
 *   get:
 *     summary: Get all organizations
 *     tags: [Organizations]
 *     responses:
 *       200:
 *         description: List of organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   organizationId:
 *                     type: string
 *                   organizationName:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/list', getOrganizations);

/**
 * @swagger
 * /api/organization/list/{id}:
 *   get:
 *     summary: Get an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The organization ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The organization details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 organizationId:
 *                   type: string
 *                 organizationName:
 *                   type: string
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Internal server error
 */
router.get('/list/:id', getOrganizationById);

/**
 * @swagger
 * /api/organization/update/{id}:
 *   put:
 *     summary: Update an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The organization ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organizationName:
 *                 type: string
 *                 example: "Updated Global Health Initiative"
 *               organizationMission:
 *                 type: string
 *                 example: "To improve global health standards."
 *               organizationWebsite:
 *                 type: string
 *                 example: "https://www.updatedhealth.org"
 *     responses:
 *       200:
 *         description: Organization updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Organization updated successfully."
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', updateOrganization);

/**
 * @swagger
 * /api/organization/delete/{id}:
 *   delete:
 *     summary: Delete an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The organization ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Organization deleted successfully
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', deleteOrganization);

export default router;
