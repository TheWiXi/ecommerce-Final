const Messages = require("../../adapters/database/mensajeSchema");

class Message{

    async getAMessage(id) {
        return await Messages.findById(id).exec(); 
    }
   
    async getAllMessages() {
        return await Messages.find({}).exec(); 
    }

}

module.exports = Message;