const express = require('express');
const OrderController = require("../controllers/orderController")
const OrderValidator = require("../validator/orderValidator")


const router  = express.Router()
const orderController = new OrderController();
const orderValidator = new OrderValidator();

router.get('/getAllOrders', orderValidator.validateOrderDataEmpty(),(req, res) => orderController.getOrdersController(req, res))

module.exports = router;
