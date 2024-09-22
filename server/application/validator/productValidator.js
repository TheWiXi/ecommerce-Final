const { body, query } = require('express-validator');
const { ObjectId } = require('mongodb');

class ProductValidator {
    validateProductData = () => {
        return [
            body('nombre')
                .notEmpty().withMessage('El nombre es obligatorio')
                .isString().withMessage('El nombre debe ser un string'),
            body('precio')
                .notEmpty().withMessage('El precio es obligatorio')
                .isNumeric().withMessage('El precio debe ser un número'),
            body('en_stock')
                .notEmpty().withMessage('El stock es obligatorio')
                .isNumeric().withMessage('El stock debe ser un número'),
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
            // Validar que no se envíen parámetros en la query (URL)
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
}

module.exports = ProductValidator;
