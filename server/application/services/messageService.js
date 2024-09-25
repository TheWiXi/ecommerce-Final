const MessageRepository = require("../../domain/repositories/messageRepository")

class MessageService{
    constructor(){
        this.MessageService = new MessageRepository()
    }
    async getMessageService(id){
        const message  = await this.MessageService.getMessageById(id)
        if(!message ){
            throw new Error(JSON.stringify({status: 404, message: 'Product not found'}));
        }
        return message
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