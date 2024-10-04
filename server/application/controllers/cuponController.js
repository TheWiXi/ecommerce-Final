const { validationResult } = require("express-validator");
const CouponService = require("../services/cuponServices");

class CouponController {
    constructor() {
        this.couponService = new CouponService();  // * Inicializa el servicio de cupones
    }

    /**
     * Obtiene un cupón específico por ID
     * @param {Object} req - Objeto de solicitud (Request)
     * @param {Object} res - Objeto de respuesta (Response)
     * @param {Object} req.params - Parámetros de la solicitud
     * @param {string} req.params.id - ID del cupón que se desea obtener
     * @returns {Promise<void>} - Retorna una promesa que resuelve cuando la respuesta es enviada
     */
    async getCouponController(req, res) {
        try {
            const errors = validationResult(req);  // * Valida la solicitud
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });  // ! Retorna errores de validación
            const coupons = await this.couponService.getCouponService(req.params.id);  // ? Obtiene el cupón
            res.status(200).json(coupons);  // * Devuelve el cupón en formato JSON
        } catch (error) {
            const errorObj = JSON.parse(error.message);  // * Maneja errores
            res.status(errorObj.status).json({ message: errorObj.message });  // ! Retorna error específico
        }
    }

    /**
     * Obtiene todos los cupones
     * @param {Object} req - Objeto de solicitud (Request)
     * @param {Object} res - Objeto de respuesta (Response)
     * @returns {Promise<void>} - Retorna una promesa que resuelve cuando la respuesta es enviada
     */
    async getCouponsController(req, res) {
        try {
            const errors = validationResult(req);  // * Valida la solicitud
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });  // ! Retorna errores de validación
            const coupons = await this.couponService.getAllCouponsService();  // ? Obtiene todos los cupones
            res.status(200).json(coupons);  // * Devuelve la lista de cupones en formato JSON
        } catch (error) {
            const errorObj = JSON.parse(error.message);  // * Maneja errores
            res.status(errorObj.status).json({ message: errorObj.message });  // ! Retorna error específico
        }
    }

    /**
     * Crea un nuevo cupón
     * @param {Object} req - Objeto de solicitud (Request)
     * @param {Object} res - Objeto de respuesta (Response)
     * @param {Object} req.body - Cuerpo de la solicitud con los datos del nuevo cupón
     * @returns {Promise<void>} - Retorna una promesa que resuelve cuando la respuesta es enviada
     */
    async createCouponController(req, res) {
        try {
            const errors = validationResult(req);  // * Valida la solicitud
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });  // ! Retorna errores de validación
            const coupons = await this.couponService.createCouponService(req.body);  // ? Crea el nuevo cupón
            res.status(201).json(coupons);  // * Devuelve el cupón creado en formato JSON
        } catch (error) {
            const errorObj = JSON.parse(error.message);  // * Maneja errores
            res.status(errorObj.status).json({ message: errorObj.message });  // ! Retorna error específico
        }
    }

    /**
     * Elimina un cupón por ID
     * @param {Object} req - Objeto de solicitud (Request)
     * @param {Object} res - Objeto de respuesta (Response)
     * @param {Object} req.params - Parámetros de la solicitud
     * @param {string} req.params.id - ID del cupón a eliminar
     * @returns {Promise<void>} - Retorna una promesa que resuelve cuando la respuesta es enviada
     */
    async deleteCouponController(req, res) {
        try {
            const errors = validationResult(req);  // * Valida la solicitud
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });  // ! Retorna errores de validación
            const coupons = await this.couponService.deleteCouponService(req.params.id);  // ? Elimina el cupón
            res.status(204).json(coupons);  // * Responde con código 204 No Content
        } catch (error) {
            const errorObj = JSON.parse(error.message);  // * Maneja errores
            res.status(errorObj.status).json({ message: errorObj.message });  // ! Retorna error específico
        }
    }

    /**
     * Actualiza un cupón por ID
     * @param {Object} req - Objeto de solicitud (Request)
     * @param {Object} res - Objeto de respuesta (Response)
     * @param {Object} req.params - Parámetros de la solicitud
     * @param {string} req.params.id - ID del cupón a actualizar
     * @param {Object} req.body - Cuerpo de la solicitud con los nuevos datos del cupón
     * @returns {Promise<void>} - Retorna una promesa que resuelve cuando la respuesta es enviada
     */
    async updateCouponController(req, res) {
        try {
            const errors = validationResult(req);  // * Valida la solicitud
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });  // ! Retorna errores de validación
            
            const coupons = await this.couponService.updateCouponService(req.params.id, req.body);  // ? Actualiza el cupón
            res.status(200).json(coupons);  // * Devuelve el cupón actualizado en formato JSON
        } catch (error) {
            console.error("Error updating coupon:", error);  // ! Log del error completo
            res.status(500).json({ message: "Error updating coupon", error: error.message });  // ! Error 500 en caso de falla del servidor
        }
    }
}

module.exports = CouponController;
