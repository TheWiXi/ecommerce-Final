const Message = require('../models/messageModel');

class MessageRepository {
    /**
     * Obtiene un mensaje específico por su ID.
     * @param {string} id - El ID del mensaje que se desea recuperar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el mensaje encontrado.
     */
    async getMessageById(id) {
        try {
            const message = new Message(); // 🟡 Crea una nueva instancia del modelo Message.
            return await message.getAMessage(id); // 🟡 Llama al método para obtener un mensaje específico.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar el mensaje.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving the message' }));
        }
    }

    /**
     * Obtiene todos los mensajes de la base de datos.
     * @returns {Promise} - Devuelve una promesa que se resuelve con todos los mensajes.
     */
    async getAllMessagesRepository() {
        try {
            const message = new Message(); // 🟡 Crea una nueva instancia del modelo Message.
            return await message.getAllMessages(); // 🟡 Llama al método para obtener todos los mensajes.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar los mensajes.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving messages' }));
        }
    }

    /**
     * Guarda un nuevo mensaje en la base de datos.
     * @param {Object} productData - Los datos del mensaje que se desea guardar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el mensaje guardado.
     */
    async saveMessagesRepository(productData) {
        try {
            const message = new Message(); // 🟡 Crea una nueva instancia del modelo Message.
            return await message.insertANewMessage(productData); // 🟡 Llama al método para insertar un nuevo mensaje.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al guardar el mensaje.
            throw new Error(JSON.stringify({ status: 500, message: 'Error saving the message' }));
        }
    }

    /**
     * Elimina un mensaje por su ID.
     * @param {string} id - El ID del mensaje que se desea eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve al eliminar el mensaje.
     */
    async deleteMessagesRepository(id) {
        try {
            const message = new Message(); // 🟡 Crea una nueva instancia del modelo Message.
            return await message.deleteMessages(id); // 🟡 Llama al método para eliminar el mensaje por ID.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al eliminar el mensaje.
            throw new Error(JSON.stringify({ status: 404, message: 'Error deleting the message' }));
        }
    }

    /**
     * Actualiza un mensaje por su ID.
     * @param {string} id - El ID del mensaje que se desea actualizar.
     * @param {Object} updateData - Los datos a actualizar en el mensaje.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el mensaje actualizado.
     */
    async updateMessagesById(id, updateData) {
        try {
            const message = new Message(); // 🟡 Crea una nueva instancia del modelo Message.
            return await message.UpdateMessages(id, updateData, { upsert: true }); // 🟡 Llama al método para actualizar el mensaje.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al actualizar el mensaje.
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating the message' }));
        }
    }
}

module.exports = MessageRepository; // 🟡 Exporta la clase MessageRepository para su uso en otros módulos.
