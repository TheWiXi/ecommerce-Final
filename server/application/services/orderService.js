// Importing the OrderRepository to handle order data operations
const OrderRepository = require('../../domain/repositories/orderRepository');

/**
 * OrderService - Service class to handle order-related operations.
 */
class OrderService {
    constructor() {
        this.orderService = new OrderRepository(); // Initializing OrderRepository instance
    }

    /**
     * Retrieves an order by its ID.
     * @param {string} id - The ID of the order to retrieve.
     * @returns {Promise<Object>} - The order object.
     * @throws {Error} - If the order is not found.
     */
    async getOrderByIdService(id) {
        const orders = await this.orderService.getOrderByIdRepository(id); // Fetching order from repository
        if (!orders) {
            throw new Error(JSON.stringify({ status: 404, message: 'Order not found' })); // Error if order not found
        }
        return orders; // Returning the found order
    }

    /**
     * Retrieves an order by its ID for a specific user.
     * @param {string} id - The ID of the order to retrieve.
     * @returns {Promise<Object>} - The order object.
     * @throws {Error} - If the order is not found.
     */
    async getOrderByIdUser(id) {
        const orders = await this.orderService.getOrderById(id); // Fetching order for user from repository
        if (!orders) {
            throw new Error(JSON.stringify({ status: 404, message: 'Order not found' })); // Error if order not found
        }
        return orders; // Returning the found order
    }

    /**
     * Retrieves all orders.
     * @returns {Promise<Array>} - An array of order objects.
     * @throws {Error} - If no orders are found.
     */
    async getAllOrderService() {
        const orders = await this.orderService.getAllOrdersRepository(); // Fetching all orders from repository
        if (!orders) {
            throw new Error(JSON.stringify({ status: 404, message: 'Orders not found' })); // Error if no orders found
        }
        return orders; // Returning the array of orders
    }

    /**
     * Creates a new order.
     * @param {Object} data - The data of the order to create.
     * @returns {Promise<Object>} - The created order object.
     * @throws {Error} - If there is an error entering the order.
     */
    async createNewOrderService(data) {
        const orders = await this.orderService.saveNewOrderRepository(data); // Saving the new order
        if (!orders) {
            throw new Error(JSON.stringify({ status: 404, message: 'Error entering product' })); // Error if order creation fails
        }
        return orders; // Returning the created order
    }

    /**
     * Deletes an order by its ID.
     * @param {string} id - The ID of the order to delete.
     * @returns {Promise<Object>} - The deleted order object.
     * @throws {Error} - If the order is not found or could not be deleted.
     */
    async deleteOrderByIdRepository(id) {
        const deletedOrder = await this.orderService.deleteOrderByIdRepository(id); // Deleting the order from the repository
        if (!deletedOrder) {
            throw new Error(JSON.stringify({ status: 404, message: 'Order not found or could not be deleted' })); // Error if order deletion fails
        }
        return deletedOrder; // Returning the deleted order
    }

    /**
     * Updates an order by its ID.
     * @param {string} id - The ID of the order to update.
     * @param {Object} data - The data to update the order with.
     * @returns {Promise<Object>} - The updated order object.
     * @throws {Error} - If the order is not found or could not be updated.
     */
    async updateOrderUserRepository(id, data) {
        const updatedOrder = await this.orderService.updateOrderByIdRepository(id, data); // Updating the order in the repository
        if (!updatedOrder) {
            throw new Error(JSON.stringify({ status: 404, message: 'Order not found or could not be updated' })); // Error if order update fails
        }
        return updatedOrder; // Returning the updated order
    }
}

// Exporting the OrderService class for use in other parts of the application
module.exports = OrderService;
