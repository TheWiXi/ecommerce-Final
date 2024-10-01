const OrderRepository = require('../../domain/repositories/orderRepository')


class OrderService{
    constructor(){
        this.orderService = new OrderRepository()
    }

    async getOrderByIdService(id){
        const orders= await this.orderService.getOrderByIdRepository(id)
        if(!orders){
            throw new Error(JSON.stringify({status: 404, message: 'Order not found'}));
        }
        return orders
    }


    async getAllOrderService(){
        const orders = await this.orderService.getAllOrdersRepository()
        if(!orders){
            throw new Error(JSON.stringify({status: 404, message: 'Orders  not found'}));
        }
        return orders
    }

    async createNewOrderService(data) {
        const orders = await this.orderService.saveNewOrderRepository(data);
        if(!orders){
            throw new Error(JSON.stringify({status: 404, message: 'Error entering product'}));
        }
        return orders;
    }

    async deleteOrderByIdRepository(id) {
        const deletedOrder = await this.orderService.deleteOrderByIdRepository(id);
        if (!deletedOrder) {
            throw new Error(JSON.stringify({status: 404, message: 'Order not found or could not be deleted'}));
        }        
        return deletedOrder;
    }

    async updateOrderUserRepository(id, data) {
        const updatedOrder = await this.orderService.updateOrderByIdRepository(id, data);
        if (!updatedOrder) {
            throw new Error(JSON.stringify({status: 404, message: 'Order not found or could not be updated'}));
        }
        return updatedOrder;
    }


}


module.exports = OrderService