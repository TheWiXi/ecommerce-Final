// Importing the ChatRepository to handle chat data operations
const ChatRepository = require('../../domain/repositories/chatRepository');

/**
 * ChatService - Service class to handle chat-related operations.
 */
class ChatService {
    constructor() {
        this.chatRepository = new ChatRepository(); // Initializing ChatRepository instance
    }

    /**
     * Saves a chat message.
     * @param {Object} message - The chat message to be saved.
     * @returns {Promise<Object>} - The saved chat message.
     * @throws {Error} - If an error occurs while saving the message.
     */
    async saveMessage(message) {
        try {
            return await this.chatRepository.saveMessage(message); // Saving the message using the repository
        } catch (error) {
            console.error('Error en ChatService.saveMessage:', error); // Logging the error
            throw error; // Re-throwing the error for further handling
        }
    }

    /**
     * Retrieves recent chat messages.
     * @param {number} [limit=50] - The maximum number of messages to retrieve.
     * @returns {Promise<Array>} - An array of recent chat messages.
     * @throws {Error} - If an error occurs while fetching recent messages.
     */
    async getRecentMessages(limit = 50) {
        try {
            return await this.chatRepository.getRecentMessages(limit); // Fetching recent messages from the repository
        } catch (error) {
            console.error('Error en ChatService.getRecentMessages:', error); // Logging the error
            throw error; // Re-throwing the error for further handling
        }
    }

    /**
     * Retrieves the message history for a specific user.
     * @param {string} userId - The ID of the user whose message history is to be retrieved.
     * @returns {Promise<Array>} - An array of messages for the specified user.
     * @throws {Error} - If an error occurs while fetching the message history.
     */
    async getMessageHistory(userId) {
        try {
            return await this.chatRepository.getMessageHistory(userId); // Fetching the message history from the repository
        } catch (error) {
            console.error('Error en ChatService.getMessageHistory:', error); // Logging the error
            throw error; // Re-throwing the error for further handling
        }
    }
}

// Exporting a new instance of ChatService for use in other parts of the application
module.exports = new ChatService();
