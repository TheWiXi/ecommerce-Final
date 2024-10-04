const Orders = require("../models/orderModel");
const { ObjectId } = require('mongodb');

class OrderRepository {
    /**
     * Obtiene un pedido específico por su ID.
     * @param {string} id - El ID del pedido que se desea recuperar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el pedido encontrado.
     */
    async getOrderByIdRepository(id) {
        try {
            const orders = new Orders(); // 🟡 Crea una nueva instancia del modelo Orders.
            return await orders.getOrdersById(id); // 🟡 Llama al método para obtener un pedido específico.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar el pedido.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving the Order' }));
        }
    }

    /**
     * Obtiene un pedido por el ID del usuario.
     * @param {string} userid - El ID del usuario cuyo pedido se desea recuperar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el pedido encontrado.
     */
    async getOrderById(userid) {
        try {
            const orders = new Orders(); // 🟡 Crea una nueva instancia del modelo Orders.
            const id = userid; // 🟡 Asigna el ID del usuario a una variable.
            const query = [
                {
                    $match: { usuarioId: new ObjectId(id) } // 🟡 Filtra los pedidos por el ID del usuario.
                }
            ];
            return await orders.aggregate(query); // 🟡 Realiza la agregación para obtener el pedido.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar el pedido.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving the Order' }));
        }
    }

    /**
     * Obtiene todos los pedidos de la base de datos.
     * @returns {Promise} - Devuelve una promesa que se resuelve con todos los pedidos.
     */
    async getAllOrdersRepository() {
        try {
            const orders = new Orders(); // 🟡 Crea una nueva instancia del modelo Orders.
            return await orders.getAllOrders(); // 🟡 Llama al método para obtener todos los pedidos.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al recuperar los pedidos.
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving Orders' }));
        }
    }

    /**
     * Guarda un nuevo pedido en la base de datos.
     * @param {Object} orderData - Los datos del pedido que se desea guardar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el pedido guardado.
     */
    async saveNewOrderRepository(orderData) {
        try {
            const orders = new Orders(); // 🟡 Crea una nueva instancia del modelo Orders.
            return await orders.insertNewOrder(orderData); // 🟡 Llama al método para insertar un nuevo pedido.
        } catch (error) {
            console.error('Error details:', error); // 🟡 Registra el error real en la consola.
            // 🟡 Lanza un error personalizado si hay un problema al guardar el pedido.
            throw new Error(JSON.stringify({ status: 500, message: 'Error saving the Order' }));
        }
    }

    /**
     * Elimina un pedido por su ID.
     * @param {string} id - El ID del pedido que se desea eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve al eliminar el pedido.
     */
    async deleteOrderByIdRepository(id) {
        try {
            const orders = new Orders(); // 🟡 Crea una nueva instancia del modelo Orders.
            return await orders.findAnOrderByIdAndDelete(id); // 🟡 Llama al método para eliminar el pedido por ID.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al eliminar el pedido.
            throw new Error(JSON.stringify({ status: 404, message: 'Error deleting Order' }));
        }
    }

    /**
     * Actualiza un pedido por su ID.
     * @param {string} id - El ID del pedido que se desea actualizar.
     * @param {Object} updateData - Los datos a actualizar en el pedido.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el pedido actualizado.
     */
    async updateOrderByIdRepository(id, updateData) {
        try {
            const orders = new Orders(); // 🟡 Crea una nueva instancia del modelo Orders.
            return await orders.findOrderByIdAndUpdate(id, updateData, { upsert: true }); // 🟡 Llama al método para actualizar el pedido.
        } catch (error) {
            // 🟡 Lanza un error personalizado si hay un problema al actualizar el pedido.
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating Order' }));
        }
    }
}

module.exports = OrderRepository; // 🟡 Exporta la clase OrderRepository para su uso en otros módulos.
