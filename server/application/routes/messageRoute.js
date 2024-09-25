const express = require('express');
const MessageController = require("../controllers/messageController")
const MessageValidator = require("../validator/messageValidator")

const router  = express.Router()

const messageController = new MessageController();
const messageValidator= new MessageValidator();

router.get("/searchAllMessages",messageValidator. validateMessagesDataEmpty(), (req, res) => messageController.getMessagesController(req, res))

module.exports = router;