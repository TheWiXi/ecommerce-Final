const Order = require('../../adapters/database/cuponSchema')

class Orders{


    async getOrdersById(id) {
        return await Order.findById(id).exec(); 
    }


    async getAllOrders() {
        return await Order.find({}).exec(); 
    }
    




}
module.exports = Orders