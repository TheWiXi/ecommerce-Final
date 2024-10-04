const { body, query, param } = require('express-validator');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

/**
 * Validator class for Order.
 */
class OrderValidator {
    
    /**
     * Validate that no data is sent in the request body or query parameters.
     * @returns {Array} - Array of validation middleware.
     */
    validateOrderDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                // ⛔️ Do not send anything in the body
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                // ⛔️ Don't send anything in the url
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    /**
     * Validate order data by ID.
     * @returns {Array} - Array of validation middleware.
     */
    validateOrderById = () => {
        return [
            param('id').custom((value, { req }) => {
                // 🛑 Validate that the provided ID is valid
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                // ⛔️ Don't send anything in the url
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                // ⛔️ Do not send anything in the body
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    /**
     * Validate order data including usuarioId, productos, total, estado, and fecha.
     * @returns {Array} - Array of validation middleware.
     */
    validateOrderData = () => {
        return [
            body('usuarioId')
                .notEmpty().withMessage('El campo usuarioId es obligatorio')
                .isLength({ min: 24, max: 24 }).withMessage('El campo usuarioId debe tener 24 caracteres')
                .isMongoId().withMessage('El campo usuarioId debe ser un ObjectId válido'),
    
            body('productos')
                .isArray().withMessage('El campo productos debe ser un array')
                .notEmpty().withMessage('El array de productos no puede estar vacío')
                .custom((productos) => {
                    productos.forEach((producto, index) => {
                        // 🛑 Validate productoId
                        if (!producto.productoId || typeof producto.productoId !== 'string' || producto.productoId.length !== 24) {
                            throw new Error(`El producto en la posición ${index} debe tener un productoId válido`);
                        }
                        // 🛑 Validate cantidad
                        if (!producto.cantidad || typeof producto.cantidad !== 'number' || producto.cantidad < 1) {
                            throw new Error(`La cantidad del producto en la posición ${index} debe ser un número mayor o igual a 1`);
                        }
                        // 🛑 Validate precio
                        if (typeof producto.precio !== 'number' || isNaN(producto.precio)) {
                            throw new Error(`El precio del producto en la posición ${index} debe ser un número válido`);
                        }
                    });
                    return true;
                }),
    
            body('total')
                .notEmpty().withMessage('El campo total es obligatorio')
                .custom(value => {
                    // 🛑 Validate total
                    if (typeof value !== 'number' || isNaN(value)) {
                        throw new Error('El campo total debe ser un número válido');
                    }
                    return true;
                }),
    
            body('estado')
                .optional()
                .isString().withMessage('El campo estado debe ser una cadena')
                .isIn(['pendiente', 'enviado', 'entregado']).withMessage('El campo estado debe ser uno de los siguientes: pendiente, enviado, entregado'),
    
            body('fecha')
                .optional()
                .isISO8601().withMessage('El campo fecha debe ser una fecha válida en formato ISO 8601')
                .toDate(),
        ];
    };

    /**
     * Validate that an order can be deleted by ID.
     * @returns {Array} - Array of validation middleware.
     */
    validateDeleteOrderById = () => {
        return [
            param('id').custom((value, { req }) => {
                // 🛑 Validate that the provided ID is valid
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                // ⛔️ Don't send anything in the url
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                // ⛔️ Do not send anything in the body
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    /**
     * Validate data for updating an order.
     * @returns {Array} - Array of validation middleware.
     */
    validateOrderDataUpdate = () => {
        return [
            // Validación de usuarioId
            body('usuarioId')
                .notEmpty().withMessage('El usuarioId es obligatorio')
                .isString().withMessage('El usuarioId debe ser un string')
                .custom((value) => {
                    // 🛑 Validar si el ID tiene el formato correcto de ObjectId (24 caracteres hexadecimales)
                    const objectIdRegex = /^[a-f\d]{24}$/i;
                    if (!objectIdRegex.test(value)) {
                        throw new Error('El usuarioId debe ser un ObjectId válido');
                    }
                    return true;
                }),
    
            // Validación de productos
            body('productos').isArray({ min: 1 }).withMessage('Debe proporcionar al menos un producto'),
    
            // Validación de productoId dentro de productos
            body('productos.*.productoId')
                .notEmpty().withMessage('El productoId es obligatorio')
                .isString().withMessage('El productoId debe ser un string')
                .custom((value) => {
                    const objectIdRegex = /^[a-f\d]{24}$/i;
                    if (!objectIdRegex.test(value)) {
                        throw new Error('El productoId debe ser un ObjectId válido');
                    }
                    return true;
                }),
    
            // Validación de cantidad dentro de productos
            body('productos.*.cantidad')
                .notEmpty().withMessage('La cantidad es obligatoria')
                .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor o igual a 1'),
    
            // Validación de precio dentro de productos
            body('productos.*.precio')
                .notEmpty().withMessage('El precio es obligatorio')
                .isFloat({ min: 0 }).withMessage('El precio debe ser un número decimal válido mayor o igual a 0'),
    
            // Validación de total
            body('total')
                .notEmpty().withMessage('El total es obligatorio')
                .isFloat({ min: 0 }).withMessage('El total debe ser un número decimal válido mayor o igual a 0'),
    
            // Validación de fecha (opcional)
            body('fecha')
                .optional()
                .isISO8601().withMessage('La fecha debe ser una fecha válida'),
    
            // Validación de estado
            body('estado')
                .optional()
                .isString().withMessage('El estado debe ser un string')
                .isIn(['pendiente', 'enviado', 'entregado']).withMessage('El estado debe ser uno de los valores permitidos: pendiente, enviado, entregado'),
    
            // Validación de que no se envíen parámetros en la URL
            query().custom((value, { req }) => {
                // ⛔️ Don't send anything in the url
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíes parámetros en la URL');
                }
                return true;
            }),
        ];
    };

}

module.exports = OrderValidator;
