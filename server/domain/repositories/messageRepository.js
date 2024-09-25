const Message = require('../models/messageModel');

class MessageRepository{

    async getMessageById(id) {
        try {
            const message = new Message();
            return await message.getAMessage(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving the message'}));
        }
    }

    async getAllMessagesRepository() {
        try {
            const message = new Message();
            return await message.getAllMessages();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving messages'}));
        }
    }

    async saveMessagesRepository(productData) {
        try {
            const message = new Message();
            return await message.insertANewMessage(productData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error saving the message'}));
        }
    }

}
module.exports = MessageRepository;