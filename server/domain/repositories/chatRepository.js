const MensajeSchema = require('../../adapters/database/mensajeSchema');

class ChatRepository {
    /**
     * Guarda un nuevo mensaje en la base de datos.
     * @param {Object} message - El objeto del mensaje que contiene información del mensaje.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el mensaje guardado.
     */
    async saveMessage(message) {
        try {
            // 🟡 Crea una nueva instancia de MensajeSchema con los datos del mensaje.
            const newMessage = new MensajeSchema({
                username: message.username, // 🟡 Nombre de usuario del autor del mensaje.
                text: message.text, // 🟡 Texto del mensaje.
                timestamp: message.timestamp, // 🟡 Marca de tiempo del mensaje.
                userId: message.userId, // 🟡 ID del usuario que envía el mensaje.
                isServer: message.isServer || false // 🟡 Indica si el mensaje es del servidor (por defecto es false).
            });
            return await newMessage.save(); // 🟡 Guarda el mensaje en la base de datos y devuelve el resultado.
        } catch (error) {
            console.error('Error en ChatRepository.saveMessage:', error); // 🟡 Registra el error en la consola.
            throw error; // 🟡 Lanza el error para que pueda ser manejado por el llamador.
        }
    }

    /**
     * Obtiene el historial de mensajes de un usuario específico.
     * @param {string} userId - El ID del usuario cuyo historial de mensajes se desea obtener.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el historial de mensajes del usuario.
     */
    async getMessageHistory(userId) {
        try {
            // 🟡 Busca mensajes por userId y los ordena por timestamp en orden ascendente.
            return await MensajeSchema.find({ userId: userId })
                .sort({ timestamp: 1 }) // 🟡 Ordena los mensajes desde el más antiguo al más reciente.
                .exec(); // 🟡 Ejecuta la consulta y devuelve el resultado.
        } catch (error) {
            console.error('Error en ChatRepository.getMessageHistory:', error); // 🟡 Registra el error en la consola.
            throw error; // 🟡 Lanza el error para que pueda ser manejado por el llamador.
        }
    }

    /**
     * Obtiene los mensajes más recientes de la base de datos.
     * @param {number} limit - El número máximo de mensajes a obtener.
     * @returns {Promise} - Devuelve una promesa que se resuelve con los mensajes recientes.
     */
    async getRecentMessages(limit) {
        try {
            // 🟡 Busca mensajes y los ordena por timestamp en orden descendente, limitando la cantidad de resultados.
            return await MensajeSchema.find()
                .sort({ timestamp: -1 }) // 🟡 Ordena los mensajes desde el más reciente al más antiguo.
                .limit(limit) // 🟡 Limita la cantidad de mensajes devueltos.
                .exec(); // 🟡 Ejecuta la consulta y devuelve el resultado.
        } catch (error) {
            console.error('Error en ChatRepository.getRecentMessages:', error); // 🟡 Registra el error en la consola.
            throw error; // 🟡 Lanza el error para que pueda ser manejado por el llamador.
        }
    }
}

module.exports = ChatRepository; // 🟡 Exporta la clase ChatRepository para su uso en otros módulos.
