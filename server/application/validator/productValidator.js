const { body, query, param } = require('express-validator');
//const { ObjectId } = require('mongodb');
const { ObjectId } = require('mongoose').Types;

class ProductValidator {
    validateProductData = () => {
        return [
            body('nombre')
                .notEmpty().withMessage('El nombre es obligatorio')
                .isString().withMessage('El nombre debe ser un string'),

            body('categoria')
                .notEmpty().withMessage('La categoría es obligatoria')
                .isString().withMessage('La categoría debe ser un string'),

            body('descripcion')
                .notEmpty().withMessage('La descripción es obligatoria')
                .isString().withMessage('La descripción debe ser un string'),

            body('precio')
                .notEmpty().withMessage('El precio es obligatorio')
                .isDecimal().withMessage('El precio debe ser un número decimal'),

            body('stock')
                .notEmpty().withMessage('El stock es obligatorio')
                .isInt().withMessage('El stock debe ser un número entero'),

            body('dimensiones')
                .notEmpty().withMessage('Las dimensiones son obligatorias') // Corregido
                .isString().withMessage('Las dimensiones deben ser un string'),

            body('foto')
                .notEmpty().withMessage('La foto es obligatoria') // Corregido
                .isString().withMessage('La foto debe ser un string'),

            body('descuento')
                .optional()
                .custom(value => {
                    // Permitir que el valor sea un número o una cadena
                    if (typeof value === 'number' || typeof value === 'string') {
                        return true; // Es válido
                    }
                    throw new Error('El descuento debe ser un número o una cadena si se proporciona');
                }),

            body('artesanoId')
                .notEmpty().withMessage('El artesanoId es obligatorio')
                .custom((value) => {
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El artesanoId debe ser un ObjectId válido');
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
            .notEmpty().withMessage('El nombre es obligatorio')
            .isString().withMessage('El nombre debe ser un string'),

        body('categoria')
            .notEmpty().withMessage('La categoría es obligatoria')
            .isString().withMessage('La categoría debe ser un string'),

        body('descripcion')
            .notEmpty().withMessage('La descripción es obligatoria')
            .isString().withMessage('La descripción debe ser un string'),

        body('precio')
            .notEmpty().withMessage('El precio es obligatorio')
            .isInt().withMessage('El stock debe ser un número entero'),

        body('stock')
            .notEmpty().withMessage('El stock es obligatorio')
            .isInt().withMessage('El stock debe ser un número entero'),

        body('dimensiones')
            .notEmpty().withMessage('Las dimensiones son obligatorias') // Corregido
            .isString().withMessage('Las dimensiones deben ser un string'),

        body('foto')
            .notEmpty().withMessage('La foto es obligatoria') // Corregido
            .isString().withMessage('La foto debe ser un string'),

        body('descuento')
            .optional()
            .custom(value => {
                // Permitir que el valor sea un número o una cadena
                if (typeof value === 'number' || typeof value === 'string') {
                    return true; // Es válido
                }
                throw new Error('El descuento debe ser un número o una cadena si se proporciona');
            }),

        body('artesanoId')
            .notEmpty().withMessage('El artesanoId es obligatorio')
            .custom((value) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('El artesanoId debe ser un ObjectId válido');
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


  validateProductGroupedIdValidator = () => {
    return [
        param('artesanoId').custom((value) => {
            if (!ObjectId.isValid(value)) {
                throw new Error('Submit a valid artesano ID');
            }
            return true;
        }),
        param('searchTerm').custom((value) => {
            if (typeof value !== 'string' || value.trim() === '') {
                throw new Error('Submit a valid search term');
            }
            return true;
        }),
        query().custom((value, { req }) => {
            if (Object.keys(req.query).length > 0) {
                throw new Error(`Don't send anything in the URL`);
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


validateProductGroupedIdToFindByNameValidator = () => {
    return [
        param('artesanoId').custom((value) => {
            if (!ObjectId.isValid(value)) {
                throw new Error('Submit a valid artesano ID');
            }
            return true;
        }),
        query('searchTerm').optional().isString().withMessage('Submit a valid search term'),
    ];
};



}

module.exports = ProductValidator;
