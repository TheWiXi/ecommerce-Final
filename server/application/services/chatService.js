const chatRepository = require('../../domain/repositories/chatRepository');

class ChatService {
  async saveChat(chatData) {
    await chatRepository.save(chatData);
  }

  async getAllChats() {
    return await chatRepository.getAll();
  }
}

module.exports = new ChatService();
