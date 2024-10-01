const {body, query, param} = require('express-validator');
const {ObjectId} = require('mongodb');

class CouponsValidator{

    validateCouponDataEmpty = () => {
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

    validateCouponId = () => {
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



validateCouponData = ()=>{
    return[

        body('codigo')
        .notEmpty().withMessage('El código es obligatorio')
        .isString().withMessage('El código debe ser un string'),

        body('descuento')
        .optional()
        .custom(value => {
            // Permitir que el valor sea un número o una cadena
            if (typeof value === 'number' || typeof value === 'string') {
                return true; // Es válido
            }
            throw new Error('El descuento debe ser un número o una cadena si se proporciona');
        }),


    body('tipo')
        .notEmpty().withMessage('El tipo es obligatorio')
        .isString().withMessage('El tipo debe ser un string')
        .isIn(['general', 'asignado']).withMessage('El tipo debe ser "general" o "asignado"'),

    body('fechaExpiracion')
        .notEmpty().withMessage('La fecha de expiración es obligatoria')
        .isString().withMessage('El tipo debe ser un string'),

    body('usuarioId')
        .optional()
        .custom((value) => {
            if (!ObjectId.isValid(value)) {
                throw new Error('El usuarioId debe ser un ObjectId válido');
            }
            return true;
        }),

    body('imagen')
        .optional()
        .isString().withMessage('La imagen debe ser una URL válida')
        .isURL().withMessage('La imagen debe ser una URL válida')

    ]

}
validateCompoundtId = () => {
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

validateCoupounUpdateDataByID = () => {
    return [
        
        param('id').custom((value) => {
            if (!ObjectId.isValid(value)) {
                throw new Error('El ID debe ser un ObjectId válido');
            }
            return true;
        }),

        
        body('codigo')
            .optional()
            .isString().withMessage('El código debe ser un string')
            .notEmpty().withMessage('El código no debe estar vacío si se proporciona'),

        
            body('descuento')
            .optional()
            .custom(value => {
                // Permitir que el valor sea un número o una cadena
                if (typeof value === 'number' || typeof value === 'string') {
                    return true; // Es válido
                }
                throw new Error('El descuento debe ser un número o una cadena si se proporciona');
            }),


       
        body('tipo')
            .optional()
            .isString().withMessage('El tipo debe ser un string')
            .isIn(['general', 'asignado']).withMessage('El tipo debe ser "general" o "asignado"'),

        
        body('fechaExpiracion')
            .optional()
            .isString().withMessage('El tipo debe ser un string'),

        
        body('usuarioId')
            .optional()
            .custom((value) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('El usuarioId debe ser un ObjectId válido');
                }
                return true;
            }),

        
        body('imagen')
            .optional()
            .isURL().withMessage('La imagen debe ser un URL válido'),

        
        query().custom((value, { req }) => {
            if (Object.keys(req.query).length > 0) {
                throw new Error('No envíes parámetros en la URL');
            }
            return true;
        }),
    ];
};



}
module.exports = CouponsValidator;