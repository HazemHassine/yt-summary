const express = require('express');
const router = express.Router();

// Import controllers
const {ytProcess} = require('../controllers/ytbController');

// Define routes
router.post('/process', ytProcess);

module.exports = router;

