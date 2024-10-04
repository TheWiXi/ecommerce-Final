const Order = require('../../adapters/database/pedidoSchema')

class Orders{

    async getOrdersById(id) {
        return await Order.findById(id).exec(); 
    }


    async getAllOrders() {
        return await Order.find({}).exec(); 
    }

    async insertNewOrder(orderData) {
        const order = new Order(orderData);
        return await order.save(); 
    }

    async findAnOrderByIdAndDelete(id) {
        return await Order.findByIdAndDelete(id).exec();
    }

    async findOrderByIdAndUpdate(id, updateData) {
        return await Order.findByIdAndUpdate(id, updateData, { new: true, upsert: true }).exec(); 
    }

    async aggregate(query) {
        return await Order.aggregate(query).exec();
    }

}

module.exports = Orders