const ChatRepository = require('../../domain/repositories/chatRepository');

class ChatService {
    constructor() {
        this.chatRepository = new ChatRepository();
    }

    async saveMessage(message) {
        try {
            return await this.chatRepository.saveMessage(message);
        } catch (error) {
            console.error('Error en ChatService.saveMessage:', error);
            throw error;
        }
    }

    async getRecentMessages(limit = 50) {
        try {
            return await this.chatRepository.getRecentMessages(limit);
        } catch (error) {
            console.error('Error en ChatService.getRecentMessages:', error);
            throw error;
        }
    }
}

module.exports = new ChatService();