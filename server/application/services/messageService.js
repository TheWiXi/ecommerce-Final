// Importing the MessageRepository to handle message data operations
const MessageRepository = require("../../domain/repositories/messageRepository");

/**
 * MessageService - Service class to handle message-related operations.
 */
class MessageService {
    constructor() {
        this.MessageService = new MessageRepository(); // Initializing MessageRepository instance
    }

    /**
     * Retrieves a message by its ID.
     * @param {string} id - The ID of the message to retrieve.
     * @returns {Promise<Object>} - The message object.
     * @throws {Error} - If the message is not found.
     */
    async getMessageService(id) {
        const message = await this.MessageService.getMessageById(id); // Fetching message from repository
        if (!message) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product not found' })); // Error if message not found
        }
        return message; // Returning the found message
    }

    /**
     * Retrieves all messages.
     * @returns {Promise<Array>} - An array of message objects.
     * @throws {Error} - If no messages are found.
     */
    async getAllMessagesService() {
        const message = await this.MessageService.getAllMessagesRepository(); // Fetching all messages from repository
        if (!message) {
            throw new Error(JSON.stringify({ status: 404, message: 'Messages not found' })); // Error if no messages found
        }
        return message; // Returning the array of messages
    }

    /**
     * Creates a new message.
     * @param {Object} data - The data of the message to create.
     * @returns {Promise<Object>} - The created message object.
     * @throws {Error} - If there is an error entering the message.
     */
    async creatingMessages(data) {
        const message = await this.MessageService.saveMessagesRepository(data); // Saving the new message
        if (!message) {
            throw new Error(JSON.stringify({ status: 404, message: 'Error entering product' })); // Error if message creation fails
        }
        return message; // Returning the created message
    }

    /**
     * Deletes a message by its ID.
     * @param {string} id - The ID of the message to delete.
     * @returns {Promise<Object>} - The deleted message object.
     * @throws {Error} - If the message is not found or could not be deleted.
     */
    async deleteMessagesRepository(id) {
        const deletedMessage = await this.MessageService.deleteMessagesRepository(id); // Deleting the message from the repository
        if (!deletedMessage) {
            throw new Error(JSON.stringify({ status: 404, message: 'Product not found or could not be deleted' })); // Error if message deletion fails
        }
        return deletedMessage; // Returning the deleted message
    }

    /**
     * Updates a message by its ID.
     * @param {string} id - The ID of the message to update.
     * @param {Object} data - The data to update the message with.
     * @returns {Promise<Object>} - The updated message object.
     * @throws {Error} - If the message is not found or could not be updated.
     */
    async updateMessagesService(id, data) {
        const updatedMessage = await this.MessageService.updateMessagesById(id, data); // Updating the message in the repository
        if (!updatedMessage) {
            throw new Error(JSON.stringify({ status: 404, message: 'Message not found or could not be updated' })); // Error if message update fails
        }
        return updatedMessage; // Returning the updated message
    }
}

// Exporting the MessageService class for use in other parts of the application
module.exports = MessageService;
