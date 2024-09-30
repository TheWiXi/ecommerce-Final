const express = require('express');
const chatService = require('../../application/services/chatService');

const router = express.Router();

router.get('/', async (req, res) => {
  const chats = await chatService.getAllChats();
  res.json(chats);
});

module.exports = router;
