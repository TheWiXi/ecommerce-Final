// Importing necessary modules
const express = require('express'); // Importing the Express framework
const OrderController = require("../controllers/orderController"); // Importing the OrderController
const OrderValidator = require("../validator/orderValidator"); // Importing the OrderValidator

// Creating an Express router instance
const router = express.Router();
const orderController = new OrderController(); // Instantiating the OrderController
const orderValidator = new OrderValidator(); // Instantiating the OrderValidator

/**
 * @route GET /getAllOrders
 * @group Orders - Operations about orders
 * @returns {Array} 200 - An array of orders
 * @returns {Error}  500 - Internal server error
 */
router.get('/getAllOrders', orderValidator.validateOrderDataEmpty(), (req, res) => 
    orderController.getOrdersController(req, res) // Fetching all orders
);

/**
 * @route GET /{id}
 * @group Orders - Operations about orders
 * @param {string} id.path.required - The id of the order
 * @returns {Object} 200 - The requested order
 * @returns {Error}  404 - Order not found
 */
router.get('/:id', orderValidator.validateOrderById(), (req, res) => 
    orderController.getOrderController(req, res) // Fetching an order by ID
);

/**
 * @route GET /searchUser/{id}
 * @group Orders - Operations about orders
 * @param {string} id.path.required - The id of the user
 * @returns {Array} 200 - An array of orders associated with the user
 * @returns {Error}  404 - No orders found for the user
 */
router.get('/searchUser/:id', orderValidator.validateOrderById(), (req, res) => 
    orderController.getOrderUser(req, res) // Fetching orders for a specific user
);

/**
 * @route POST /postingNewOrder
 * @group Orders - Operations about orders
 * @param {Order.model} order.body.required - Order data
 * @returns {Object} 201 - The created order
 * @returns {Error}  400 - Invalid order data
 */
router.post('/postingNewOrder', orderValidator.validateOrderData(), (req, res) => 
    orderController.createNewOrderController(req, res) // Creating a new order
);

/**
 * @route DELETE /{id}
 * @group Orders - Operations about orders
 * @param {string} id.path.required - The id of the order to delete
 * @returns {Object} 204 - Order deleted successfully
 * @returns {Error}  404 - Order not found
 */
router.delete('/:id', orderValidator.validateDeleteOrderById(), (req, res) => 
    orderController.deleteOrderController(req, res) // Deleting an order by ID
);

/**
 * @route PUT /{id}
 * @group Orders - Operations about orders
 * @param {string} id.path.required - The id of the order to update
 * @param {Order.model} order.body.required - Updated order data
 * @returns {Object} 200 - The updated order
 * @returns {Error}  400 - Invalid order update data
 */
router.put('/:id', orderValidator.validateOrderDataUpdate(), (req, res) => 
    orderController.updateOrderController(req, res) // Updating an order by ID
);

// Exporting the router for use in other parts of the application
module.exports = router;
