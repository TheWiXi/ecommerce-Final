const { body, query, param } = require('express-validator');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

class OrderValidator{

    validateOrderDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateOrderById = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

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
                        if (!producto.productoId || typeof producto.productoId !== 'string' || producto.productoId.length !== 24) {
                            throw new Error(`El producto en la posición ${index} debe tener un productoId válido`);
                        }
                        if (!producto.cantidad || typeof producto.cantidad !== 'number' || producto.cantidad < 1) {
                            throw new Error(`La cantidad del producto en la posición ${index} debe ser un número mayor o igual a 1`);
                        }
                        if (typeof producto.precio !== 'number' || isNaN(producto.precio)) {
                            throw new Error(`El precio del producto en la posición ${index} debe ser un número válido`);
                        }
                    });
                    return true;
                }),
    
            body('total')
                .notEmpty().withMessage('El campo total es obligatorio')
                .custom(value => {
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

    validateDeleteOrderById = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };
    
}

module.exports = OrderValidator