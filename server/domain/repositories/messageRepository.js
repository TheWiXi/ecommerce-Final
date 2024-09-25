const Message = require('../models/messageModel');

class MessageRepository{

    async getAllMessagesRepository() {
        try {
            const message = new Message();
            return await message.getAllMessages();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving products'}));
        }
    }

}
module.exports = MessageRepository;