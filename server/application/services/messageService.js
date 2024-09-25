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

    async creatingMessages(data) {
        const message  = await this.MessageService.saveMessagesRepository(data);
        if(!message ){
            throw new Error(JSON.stringify({status: 404, message: 'Error entering product'}));
        }
        return message 
    }

    async deleteMessagesRepository(id) {
        const deletedMessage = await this.MessageService.deleteMessagesRepository(id);
        if (!deletedMessage) {
            throw new Error(JSON.stringify({status: 404, message: 'Product not found or could not be deleted'}));
        }        
        return deletedMessage;
    }
}

module.exports = MessageService