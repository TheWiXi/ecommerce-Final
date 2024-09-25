const Messages = require("../../adapters/database/mensajeSchema");

class Message{
   
    async getAllMessages() {
        return await Messages.find({}).exec(); 
    }

}

module.exports = Message;