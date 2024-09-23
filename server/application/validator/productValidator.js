const { body, query, param } = require('express-validator');
const { ObjectId } = require('mongodb');

class ProductValidator {
    validateProductData = () => {
        return [
            body('nombre')
                .notEmpty().withMessage('El nombre es obligatorio')
                .isString().withMessage('El nombre debe ser un string'),

            body('descripcion')
                .notEmpty().withMessage('La descripción es obligatoria')
                .isString().withMessage('La descripción debe ser un string'),

            body('precio')
                .notEmpty().withMessage('El precio es obligatorio')
                .isDecimal().withMessage('El precio debe ser un número decimal'),

            body('stock')
                .notEmpty().withMessage('El stock es obligatorio')
                .isInt().withMessage('El stock debe ser un número entero'),

            body('categoria')
                .notEmpty().withMessage('La categoría es obligatoria')
                .isString().withMessage('La categoría debe ser un string'),

            body('descuento')
                .optional()
                .isNumeric().withMessage('El descuento debe ser un número si se proporciona'),

            body('artesanoId')
                .notEmpty().withMessage('El artesanoId es obligatorio')
                .custom((value) => {
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El artesanoId debe ser un ObjectId válido');
                    }
                    return true;
                }),

            body('fotos')
                .optional()
                .isArray().withMessage('Las fotos deben ser un array')
                .custom((fotos) => {
                    fotos.forEach((foto) => {
                        if (typeof foto !== 'string') {
                            throw new Error('Cada foto debe ser una cadena de texto');
                        }
                    });
                    return true;
                }),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíes parámetros en la URL');
                }
                return true;
            }),
        ];
    };

    validateProductDataEmpty = () => {
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

    validateProductUpdateDataByID = () => {
        return [
            param('id').custom((value) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('El ID debe ser un ObjectId válido');
                }
                return true;
            }),
    
            body('nombre')
                .optional()
                .isString().withMessage('El nombre debe ser un string')
                .notEmpty().withMessage('El nombre no debe estar vacío si se proporciona'),
    
            body('precio')
                .optional()
                .isNumeric().withMessage('El precio debe ser un número'),
    
            body('stock')
                .optional()
                .isNumeric().withMessage('El stock debe ser un número'),
    
            body('categoria')
                .optional()
                .isString().withMessage('La categoría debe ser un string')
                .notEmpty().withMessage('La categoría no debe estar vacía si se proporciona'),

            body('descuento')
                .optional()
                .isNumeric().withMessage('El descuento debe ser un número si se proporciona'),
    
            body('artesanoId')
                .optional()
                .custom((value) => {
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El artesanoId debe ser un ObjectId válido');
                    }
                    return true;
                }),
    
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíes parámetros en la URL');
                }
                return true;
            }),
        ];
    };

    validateProductId = () => {
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

module.exports = ProductValidator;
