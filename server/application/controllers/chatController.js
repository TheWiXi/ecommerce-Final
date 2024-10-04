class ChatController {
    /**
     * Obtiene el historial de mensajes para un usuario específico
     * @param {Object} req - Objeto de solicitud (Request)
     * @param {Object} res - Objeto de respuesta (Response)
     * @param {Object} req.params - Parámetros de la solicitud
     * @param {string} req.params.userId - ID del usuario para el historial de mensajes
     * @param {Object[]} res.json - Devuelve el historial de mensajes en formato JSON
     * @returns {Promise<void>} - Retorna una promesa que resuelve cuando la respuesta es enviada
     */
    async getMessageHistory(req, res) {
        try {
            const { userId } = req.params;  // * ID del usuario que se obtiene de los parámetros de la solicitud
            const messages = await chatService.getMessageHistory(userId);  // ? Llama al servicio de chat para obtener el historial
            res.json(messages);  // * Devuelve el historial de mensajes en formato JSON
        } catch (error) {
            console.error('Error al obtener el historial de mensajes:', error);  // ! Manejo de errores
            res.status(500).json({ error: 'Error interno del servidor' });  // ! Error 500 en caso de falla del servidor
        }
    }

    /**
     * Maneja y guarda un mensaje en el sistema
     * @param {string} userId - ID del usuario que envía el mensaje
     * @param {Object} message - Objeto con los detalles del mensaje
     * @param {string} message.texto - Texto del mensaje
     * @param {string} message.username - Nombre de usuario que envía el mensaje
     * @param {string} message.transmitter - Identificador del transmisor (puede ser 'server' o el nombre del usuario)
     * @returns {Promise<Object>} - Retorna el mensaje guardado como un objeto
     * @throws {Error} - Lanza un error si no se puede manejar el mensaje
     */
    async handleMessage(userId, message) {
        try {
            // * Llama al servicio de chat para guardar el mensaje
            return await chatService.saveMessage({
                userId,  // * ID del usuario que envía el mensaje
                text: message.texto,  // * Contenido del mensaje
                username: message.transmitter === 'server' ? 'Soporte' : message.username,  // * Si el transmisor es 'server', el nombre será 'Soporte'
                transmitter: message.transmitter  // * Define si el mensaje es del servidor o del usuario
            });
        } catch (error) {
            console.error('Error al manejar el mensaje:', error);  // ! Manejo de errores
            throw error;  // ! Lanza el error para ser manejado por el código que lo llame
        }
    }
}

module.exports = new ChatController();
