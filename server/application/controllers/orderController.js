const { validationResult } = require("express-validator")
const OrderService = require("../services/orderService")

/**
 * @class OrderController
 * @description Controlador para manejar las operaciones relacionadas con las órdenes.
 */
class OrderController {
    constructor() {
        // Instancia del servicio de órdenes
        this.orderService = new OrderService()
    }

    /**
     * @async
     * @function getOrderController
     * @description Controlador para obtener una orden específica por ID.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async getOrderController(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Obtener la orden utilizando el servicio
            const ordered = await this.orderService.getOrderByIdService(req.params.id);
            // Devolver la orden encontrada
            res.status(200).json(ordered);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function getOrderUser
     * @description Controlador para obtener una orden específica por ID de usuario.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async getOrderUser(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Obtener la orden utilizando el servicio
            const ordered = await this.orderService.getOrderByIdUser(req.params.id);
            // Devolver la orden encontrada
            res.status(200).json(ordered);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function getOrdersController
     * @description Controlador para obtener todas las órdenes.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async getOrdersController(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Obtener todas las órdenes utilizando el servicio
            const ordered = await this.orderService.getAllOrderService();
            // Devolver todas las órdenes
            res.status(200).json(ordered);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function createNewOrderController
     * @description Controlador para crear una nueva orden.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async createNewOrderController(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, registrar y devolver un error 400
            if (!errors.isEmpty()) {
                console.log('Validation Errors:', errors.array());
                return res.status(400).json({ errors: errors.array() });
            }
            // Log de los datos de la orden validados
            console.log('Validated Order Data:', req.body);
            // Crear una nueva orden utilizando el servicio
            const ordered = await this.orderService.createNewOrderService(req.body);
            // Devolver la nueva orden creada
            res.status(201).json(ordered);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function deleteOrderController
     * @description Controlador para eliminar una orden por ID.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async deleteOrderController(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Eliminar la orden utilizando el servicio
            const ordered = await this.orderService.deleteOrderByIdRepository(req.params.id);
            // Devolver un estado 204 sin contenido
            res.status(204).json(ordered);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function updateOrderController
     * @description Controlador para actualizar una orden por ID.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async updateOrderController(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Actualizar la orden utilizando el servicio
            const ordered = await this.orderService.updateOrderUserRepository(req.params.id, req.body);
            // Devolver la orden actualizada
            res.status(200).json(ordered);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
}

module.exports = OrderController;
