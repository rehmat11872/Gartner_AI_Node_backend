const express = require('express')
const { createOrganization } = require('../controllers/organizationController.js')
// import authMiddleware from '../middleware/authMiddleware';


const router = express.Router();

router.post('/',  organizationLimitMiddleware, createOrganization);

export default router;
