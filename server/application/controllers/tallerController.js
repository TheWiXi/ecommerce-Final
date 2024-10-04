const { validationResult } = require("express-validator");
const productService = require("../services/productServices");

/**
 * @class productController
 * @description Controlador para manejar las operaciones relacionadas con los productos.
 */
class productController {
    constructor() {
        // Instancia del servicio de productos
        this.productService = new productService();
    }

    /**
     * @async
     * @function getproduct
     * @description Controlador para obtener un producto específico por ID.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async getproduct(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Obtener el producto utilizando el servicio
            const product = await this.productService.getProductById(req.params.id);
            // Devolver el producto encontrado
            res.status(200).json(product);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function getproductForcategory
     * @description Controlador para obtener productos por categoría.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async getproductForcategory(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Obtener productos de la categoría utilizando el servicio
            const product = await this.productService.getProductCategory(req.body);
            // Devolver los productos encontrados
            res.status(200).json(product);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function getproductForcategoryAndFavorite
     * @description Controlador para obtener productos por categoría y favoritos.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async getproductForcategoryAndFavorite(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Obtener productos de la categoría y favoritos utilizando el servicio
            const product = await this.productService.getProductCategoryAndFavorite(req.body);
            // Devolver los productos encontrados
            res.status(200).json(product);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function getproductForDiscounts
     * @description Controlador para obtener productos en descuento.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async getproductForDiscounts(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Obtener productos en descuento utilizando el servicio
            const product = await this.productService.getProductsDiscounts(req.body);
            // Devolver los productos encontrados
            res.status(200).json(product);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function getProductsAll
     * @description Controlador para obtener todos los productos.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async getProductsAll(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Obtener todos los productos utilizando el servicio
            const product = await this.productService.getAllProduct();
            // Devolver todos los productos encontrados
            res.status(200).json(product);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function createProduct
     * @description Controlador para crear un nuevo producto.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async createProduct(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Crear un nuevo producto utilizando el servicio
            const product = await this.productService.createProduct(req.body);
            // Devolver el nuevo producto creado
            res.status(201).json(product);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function updateProduct
     * @description Controlador para actualizar un producto existente por ID.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async updateProduct(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Actualizar el producto utilizando el servicio
            const product = await this.productService.updateProduct(req.params.id, req.body);
            // Devolver el producto actualizado
            res.status(200).json(product);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function deleteProduct
     * @description Controlador para eliminar un producto por ID.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async deleteProduct(req, res) {
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Eliminar el producto utilizando el servicio
            const product = await this.productService.deleteProduct(req.params.id);
            // Devolver un estado 204 sin contenido
            res.status(204).json(product);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * @async
     * @function getProductsGroupedByArtesanoWithName
     * @description Controlador para obtener productos agrupados por artesano con nombre.
     * @param {Object} req - El objeto de la solicitud HTTP.
     * @param {Object} res - El objeto de respuesta HTTP.
     */
    async getProductsGroupedByArtesanoWithName(req, res) {  
        try {
            const errors = validationResult(req);
            // Si hay errores de validación, devolver un error 400
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            // Obtener productos agrupados por artesano utilizando el servicio
            const product = await this.productService.getProductsGroupedByArtesanoWithNames(req.params.id);
            // Devolver los productos encontrados
            res.status(200).json(product);
        } catch (error) {
            // Manejo de errores: devolver el estado y mensaje del error
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
}

module.exports = productController;
