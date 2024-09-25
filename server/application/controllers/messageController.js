const {validationResult} = require("express-validator")
const MessageService = require("../services/messageService")

class MessageController{
    constructor(){
        this.messageService = new MessageService()
    }

    async getMessageController(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const message = await this.messageService.getMessageService(req.params.id);
            res.status(200).json(message);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getMessagesController(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const message = await this.messageService.getAllMessagesService();
            res.status(200).json(message);
        }catch(error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    async creatingMessagesController(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const message = await this.messageService.creatingMessages(req.body);
            res.status(201).json(message);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
}

module.exports = MessageController