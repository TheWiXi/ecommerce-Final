const Messages = require("../../adapters/database/mensajeSchema");

class Message{

    async getAMessage(id) {
        return await Messages.findById(id).exec(); 
    }
   
    async getAllMessages() {
        return await Messages.find({}).exec(); 
    }

    async insertANewMessage(productData) {
        const messages = new Messages(productData);
        return await messages.save(); 
    }
}

module.exports = Message;