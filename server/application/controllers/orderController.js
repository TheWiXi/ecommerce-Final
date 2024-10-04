const {validationResult} = require("express-validator")
const OrderService = require("../services/orderService")



class OrderController{
    constructor(){
        this.orderService = new OrderService()
    }

    async getOrderController(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const ordered = await this.orderService.getOrderByIdService(req.params.id);
            res.status(200).json(ordered);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getOrderUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const ordered = await this.orderService.getOrderByIdUser(req.params.id);
            res.status(200).json(ordered);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
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

    async createNewOrderController(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log('Validation Errors:', errors.array());
                return res.status(400).json({ errors: errors.array() });
            }
            console.log('Validated Order Data:', req.body); // Log the validated data
            const ordered = await this.orderService.createNewOrderService(req.body);
            res.status(201).json(ordered);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteOrderController(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const ordered = await this.orderService.deleteOrderByIdRepository(req.params.id);
            res.status(204).json(ordered);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updateOrderController(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const ordered = await this.orderService.updateOrderUserRepository(req.params.id, req.body);
            res.status(200).json(ordered);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    
}


module.exports = OrderController