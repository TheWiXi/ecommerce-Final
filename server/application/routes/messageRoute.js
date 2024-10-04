// Importing necessary modules
const express = require('express'); // Importing the Express framework
const MessageController = require("../controllers/messageController"); // Importing the MessageController
const MessageValidator = require("../validator/messageValidator"); // Importing the MessageValidator

// Creating an Express router instance
const router = express.Router();

const messageController = new MessageController(); // Instantiating the MessageController
const messageValidator = new MessageValidator(); // Instantiating the MessageValidator

/**
 * @route GET /searchAllMessages
 * @group Messages - Operations about messages
 * @returns {Array} 200 - An array of messages
 * @returns {Error}  500 - Internal server error
 */
router.get("/searchAllMessages", messageValidator.validateMessagesDataEmpty(), (req, res) => 
    messageController.getMessagesController(req, res) // Fetching all messages
);

/**
 * @route GET /{id}
 * @group Messages - Operations about messages
 * @param {string} id.path.required - The id of the message
 * @returns {Object} 200 - The requested message
 * @returns {Error}  404 - Message not found
 */
router.get("/:id", messageValidator.validateMessageId(), (req, res) => 
    messageController.getMessageController(req, res) // Fetching a message by ID
);

/**
 * @route POST /newMessage
 * @group Messages - Operations about messages
 * @param {Message.model} message.body.required - Message data
 * @returns {Object} 201 - The created message
 * @returns {Error}  400 - Invalid message data
 */
router.post("/newMessage", messageValidator.validateMessageData(), (req, res) => 
    messageController.creatingMessagesController(req, res) // Creating a new message
);

/**
 * @route DELETE /{id}
 * @group Messages - Operations about messages
 * @param {string} id.path.required - The id of the message to delete
 * @returns {Object} 204 - Message deleted successfully
 * @returns {Error}  404 - Message not found
 */
router.delete("/:id", messageValidator.validateMessageId(), (req, res) => 
    messageController.deleteMessageController(req, res) // Deleting a message by ID
);

/**
 * @route PUT /{id}
 * @group Messages - Operations about messages
 * @param {string} id.path.required - The id of the message to update
 * @param {Message.model} message.body.required - Updated message data
 * @returns {Object} 200 - The updated message
 * @returns {Error}  400 - Invalid message update data
 */
router.put("/:id", messageValidator.validateMessageUpdateDataByID(), (req, res) => 
    messageController.updateMessagesController(req, res) // Updating a message by ID
);

// Exporting the router for use in other parts of the application
module.exports = router;
