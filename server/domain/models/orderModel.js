const Order = require('../../adapters/database/pedidoSchema');

class Orders {

    /**
     * Obtiene un pedido específico por su ID.
     * @param {string} id - El ID del pedido a obtener.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el pedido encontrado.
     */
    async getOrdersById(id) {
        return await Order.findById(id).exec(); // 🟡 Busca el pedido por ID y lo devuelve.
    }

    /**
     * Obtiene todos los pedidos de la base de datos.
     * @returns {Promise} - Devuelve una promesa que se resuelve con todos los pedidos encontrados.
     */
    async getAllOrders() {
        return await Order.find({}).exec(); // 🟡 Devuelve todos los pedidos en la base de datos.
    }

    /**
     * Inserta un nuevo pedido en la base de datos.
     * @param {Object} orderData - Los datos del pedido a insertar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el pedido guardado.
     */
    async insertNewOrder(orderData) {
        const order = new Order(orderData); // 🟡 Crea una instancia del modelo Order con los datos proporcionados.
        return await order.save(); // 🟡 Guarda el pedido en la base de datos y lo devuelve.
    }

    /**
     * Elimina un pedido específico por su ID.
     * @param {string} id - El ID del pedido a eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el resultado de la eliminación.
     */
    async findAnOrderByIdAndDelete(id) {
        return await Order.findByIdAndDelete(id).exec(); // 🟡 Busca y elimina el pedido por ID, devolviendo el resultado.
    }

    /**
     * Actualiza un pedido específico por su ID.
     * @param {string} id - El ID del pedido a actualizar.
     * @param {Object} updateData - Los datos a actualizar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el pedido actualizado.
     */
    async findOrderByIdAndUpdate(id, updateData) {
        return await Order.findByIdAndUpdate(id, updateData, { new: true, upsert: true }).exec(); // 🟡 Busca el pedido por ID y lo actualiza, devolviendo el nuevo documento.
    }

    /**
     * Realiza una agregación en los pedidos de la base de datos.
     * @param {Array} query - La consulta de agregación a aplicar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el resultado de la agregación.
     */
    async aggregate(query) {
        return await Order.aggregate(query).exec(); // 🟡 Realiza una agregación sobre los pedidos y devuelve el resultado.
    }

}

module.exports = Orders; // 🟡 Exporta la clase Orders para su uso en otros módulos.
