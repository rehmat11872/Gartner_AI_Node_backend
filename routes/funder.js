const express = require('express')
const { createFunder } = require('../controllers/funderController.js')
// import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/',  createFunder);

export default router;
