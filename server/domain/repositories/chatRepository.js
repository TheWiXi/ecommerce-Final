const MensajeSchema = require('../../adapters/database/mensajeSchema');

class ChatRepository {
    async saveMessage(message) {
        try {
            const newMessage = new MensajeSchema({
                username: message.username,
                text: message.text,
                timestamp: message.timestamp
            });
            return await newMessage.save();
        } catch (error) {
            console.error('Error en ChatRepository.saveMessage:', error);
            throw error;
        }
    }

    async getRecentMessages(limit) {
        try {
            return await MensajeSchema.find()
                .sort({ timestamp: -1 })
                .limit(limit)
                .exec();
        } catch (error) {
            console.error('Error en ChatRepository.getRecentMessages:', error);
            throw error;
        }
    }
}

module.exports = ChatRepository;