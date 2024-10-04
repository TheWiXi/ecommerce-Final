const chatService = require('../services/chatService');

class ChatController {
    async getMessageHistory(req, res) {
        try {
            const { userId } = req.params;
            const messages = await chatService.getMessageHistory(userId);
            res.json(messages);
        } catch (error) {
            console.error('Error al obtener el historial de mensajes:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async handleMessage(userId, message) {
        try {
            return await chatService.saveMessage({
                userId,
                text: message.texto,
                username: message.transmitter === 'server' ? 'Soporte' : message.username,
                transmitter: message.transmitter
            });
        } catch (error) {
            console.error('Error al manejar el mensaje:', error);
            throw error;
        }
    }
}

module.exports = new ChatController();