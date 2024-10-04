const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/history/:userId', (req, res) => chatController.getMessageHistory(req, res));

module.exports = router;