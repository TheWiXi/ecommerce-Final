const Orders = require("../models/orderModel")

class OrderRepository{

    async getOrderByIdRepository(id) {
        try {
            const orders= new Orders();
            return await orders.
            getOrdersById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving the Order'}));
        }
    }

    async getAllOrdersRepository() {
        try {
            const orders = new Orders();
            return await orders.getAllOrders();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Orders'}));
        }
    }
    async saveNewOrderRepository(orderData) {
        try {
            const orders = new Orders();
            return await orders.insertNewOrder(orderData);
        } catch (error) {
            console.error('Error details:', error); // Log the actual error
            throw new Error(JSON.stringify({status: 500, message: 'Error saving the Order'}));
        }
    }
    


}

module.exports = OrderRepository