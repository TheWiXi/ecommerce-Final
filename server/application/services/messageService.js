const MessageRepository = require("../../domain/repositories/messageRepository")

class MessageService{
    constructor(){
        this.MessageService = new MessageRepository()
    }

    async getAllMessagesService(){
        const message  = await this.MessageService.getAllMessagesRepository()
        if(!message ){
            throw new Error(JSON.stringify({status: 404, message: 'Messages not found'}));
        }
        return message
    }  
}

module.exports = MessageService