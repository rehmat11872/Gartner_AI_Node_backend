const express = require('express');
const { submitQuestions } = require('../controllers/questionController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/', authenticate, submitQuestions);

module.exports = router;
