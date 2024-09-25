const express = require('express');
const MessageController = require("../controllers/messageController")
const MessageValidator = require("../validator/messageValidator")

const router  = express.Router()

const messageController = new MessageController();
const messageValidator= new MessageValidator();

router.get("/searchAllMessages",messageValidator. validateMessagesDataEmpty(), (req, res) => messageController.getMessagesController(req, res))
router.get("/:id",messageValidator. validateMessageId(), (req, res) => messageController.getMessageController(req, res))
router.post("/newMessage",messageValidator. validateMessageData (), (req, res) => messageController.creatingMessagesController(req, res))
router.delete("/:id",messageValidator.validateMessageId (), (req, res) => messageController.deleteMessageController(req, res))
module.exports = router;