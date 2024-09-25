const Order = require('../../adapters/database/cuponSchema')

class Orders{


    async getAllOrders() {
        return await Order.find({}).exec(); 
    }




}
module.exports = Orders