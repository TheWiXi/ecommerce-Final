const OrderRepository = require('../../domain/repositories/orderRepository')


class OrderService{
    constructor(){
        this.orderService = new OrderRepository()
    }

    async getAllOrderService(){
        const orders = await this.orderService.getAllOrdersRepository()
        if(!orders){
            throw new Error(JSON.stringify({status: 404, message: 'Orders  not found'}));
        }
        return orders
    }




}


module.exports = OrderService