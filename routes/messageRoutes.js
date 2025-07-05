const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

// Public: Submit a message
router.post('/', messageController.createMessage);

// Admin: Get all messages
router.get('/', auth, messageController.getAllMessages);

module.exports = router; 