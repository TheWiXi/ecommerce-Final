const express = require('express');
const OrderController = require("../controllers/orderController")
const OrderValidator = require("../validator/orderValidator")


const router  = express.Router()
const orderController = new OrderController();
const orderValidator = new OrderValidator();

router.get('/getAllOrders', orderValidator.validateOrderDataEmpty(),(req, res) => orderController.getOrdersController(req, res))
router.get('/:id', orderValidator.validateOrderById (),(req, res) => orderController.getOrderController(req, res))
router.post('/postingNewOrder', orderValidator.validateOrderData (),(req, res) => orderController.createNewOrderController(req, res))
router.delete('/:id', orderValidator.validateDeleteOrderById (),(req, res) => orderController.deleteOrderController(req, res))
router.put('/:id', orderValidator.validateOrderDataUpdate  (),(req, res) => orderController.updateOrderController(req, res))


module.exports = router;
