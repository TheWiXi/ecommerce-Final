const Orders = require("../models/orderModel")
const {ObjectId} = require('mongodb')

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

    async getOrderById(userid) {
        try {
            const orders= new Orders();
            const id = userid
            const query = [
                {
                    $match: { usuarioId: new ObjectId(id) }
                }
            ];
            return await orders.aggregate(query);
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

    async deleteOrderByIdRepository(id) {
        try {
            const orders = new Orders();
            return await orders.findAnOrderByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting Order'}));
        }
    }

    async updateOrderByIdRepository(id, updateData) {
        try {
            const orders = new Orders();
            return await orders.findOrderByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating Order'}));
        }
    }


}

module.exports = OrderRepository