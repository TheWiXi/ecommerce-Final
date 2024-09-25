const Orders = require("../models/orderModel")

class OrderRepository{

    async getAllOrdersRepository() {
        try {
            const orders = new Orders();
            return await orders.getAllOrders();
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Orders'}));
        }
    }



}

module.exports = OrderRepository