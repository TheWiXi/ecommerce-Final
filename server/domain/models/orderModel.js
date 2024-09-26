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


}
module.exports = Orders