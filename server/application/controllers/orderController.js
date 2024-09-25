const {validationResult} = require("express-validator")
const OrderService = require("../services/orderService")



class OrderController{
    constructor(){
        this.orderService = new OrderService()
    }

    async getOrdersController(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const ordered = await this.orderService.getAllOrderService();
            res.status(200).json(ordered);
        }catch(error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }







}


module.exports = OrderController