const express = require('express');
const { createGrant, getAllGrants, getGrantById } = require('../controllers/grantController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/', authenticate, createGrant);
router.get('/', authenticate, getAllGrants);
router.get('/:id', authenticate, getGrantById);

module.exports = router;