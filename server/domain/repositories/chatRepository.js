const Chat = require('../../adapters/database/mensajeSchema');

class MongoChatRepository {
  async save(chat) {
    const newChat = new Chat(chat);
    return await newChat.save();
  }

  async getAll() {
    return await Chat.find({});
  }
}

module.exports = new MongoChatRepository();
