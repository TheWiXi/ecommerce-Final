const Messages = require("../../adapters/database/mensajeSchema");

class Message {

    /**
     * Obtiene un mensaje específico por su ID.
     * @param {string} id - El ID del mensaje a obtener.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el mensaje encontrado.
     */
    async getAMessage(id) {
        return await Messages.findById(id).exec(); // 🟡 Busca el mensaje por ID y lo devuelve.
    }

    /**
     * Obtiene todos los mensajes de la base de datos.
     * @returns {Promise} - Devuelve una promesa que se resuelve con todos los mensajes encontrados.
     */
    async getAllMessages() {
        return await Messages.find({}).exec(); // 🟡 Devuelve todos los mensajes en la base de datos.
    }

    /**
     * Inserta un nuevo mensaje en la base de datos.
     * @param {Object} productData - Los datos del mensaje a insertar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el mensaje guardado.
     */
    async insertANewMessage(productData) {
        const messages = new Messages(productData); // 🟡 Crea una instancia del modelo Messages con los datos proporcionados.
        return await messages.save(); // 🟡 Guarda el mensaje en la base de datos y lo devuelve.
    }

    /**
     * Elimina un mensaje específico por su ID.
     * @param {string} id - El ID del mensaje a eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el resultado de la eliminación.
     */
    async deleteMessages(id) {
        return await Messages.findByIdAndDelete(id).exec(); // 🟡 Busca y elimina el mensaje por ID, devolviendo el resultado.
    }

    /**
     * Actualiza un mensaje específico por su ID.
     * @param {string} id - El ID del mensaje a actualizar.
     * @param {Object} updateData - Los datos a actualizar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el mensaje actualizado.
     */
    async UpdateMessages(id, updateData) {
        return await Messages.findByIdAndUpdate(id, updateData, { new: true, upsert: true }).exec(); // 🟡 Busca el mensaje por ID y lo actualiza, devolviendo el nuevo documento.
    }

}

module.exports = Message; // 🟡 Exporta la clase Message para su uso en otros módulos.
