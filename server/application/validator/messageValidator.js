const { body, query, param } = require('express-validator');
const { ObjectId } = require('mongodb');

class MessageValidator{

    validateMessageId = () => {
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

    validateMessagesDataEmpty = () => {
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

    validateMessageData = () => {
        return [
            body('remitenteId')
                .notEmpty().withMessage('El remitenteId es obligatorio')
                .custom((value) => {
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El remitenteId debe ser un ObjectId válido');
                    }
                    return true;
                }),

            body('receptorId')
                .notEmpty().withMessage('El receptorId es obligatorio')
                .custom((value) => {
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El receptorId debe ser un ObjectId válido');
                    }
                    return true;
                }),

            body('contenido')
                .notEmpty().withMessage('El contenido es obligatorio')
                .isString().withMessage('El contenido debe ser un string'),

            body('fecha')
                .notEmpty().withMessage('La fecha es obligatoria')
                .isISO8601().withMessage('La fecha debe ser una fecha válida en formato ISO 8601'),

            // Ensure no query params are sent in the URL
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíes parámetros en la URL');
                }
                return true;
            }),
        ];
    };

    validateMessageId = () => {
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
module.exports = MessageValidator;