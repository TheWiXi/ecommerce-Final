const { body, query, param } = require('express-validator');
const { ObjectId } = require('mongodb');

/**
 * Class representing a Message Validator.
 */
class MessageValidator {

    /**
     * Validates the ID parameter in the request.
     * @returns {Array} Array of validation middleware functions.
     */
    validateMessageId = () => {
        return [
            param('id').custom((value, { req }) => {
                // Validar que el ID sea un ObjectId válido
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                // Asegurarse de que no se envíen parámetros en la URL
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                // Asegurarse de que no se envíe un cuerpo en la solicitud
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    /**
     * Validates that the message data is empty.
     * @returns {Array} Array of validation middleware functions.
     */
    validateMessagesDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                // Asegurarse de que no se envíe un cuerpo en la solicitud
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                // Asegurarse de que no se envíen parámetros en la URL
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    /**
     * Validates the message data in the request body.
     * @returns {Array} Array of validation middleware functions.
     */
    validateMessageData = () => {
        return [
            body('remitenteId')
                .notEmpty().withMessage('El remitenteId es obligatorio')
                .custom((value) => {
                    // Validar que el remitenteId sea un ObjectId válido
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El remitenteId debe ser un ObjectId válido');
                    }
                    return true;
                }),

            body('receptorId')
                .notEmpty().withMessage('El receptorId es obligatorio')
                .custom((value) => {
                    // Validar que el receptorId sea un ObjectId válido
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

            // Asegurarse de que no se envíen parámetros en la URL
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíes parámetros en la URL');
                }
                return true;
            }),
        ];
    };

    /**
     * Validates the ID parameter again for messages.
     * @returns {Array} Array of validation middleware functions.
     */
    validateMessageId = () => {
        return [
            param('id').custom((value, { req }) => {
                // Validar que el ID sea un ObjectId válido
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                // Asegurarse de que no se envíen parámetros en la URL
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                // Asegurarse de que no se envíe un cuerpo en la solicitud
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    /**
     * Validates the data for updating a message by ID.
     * @returns {Array} Array of validation middleware functions.
     */
    validateMessageUpdateDataByID = () => {
        return [
            param('id').custom((value) => {
                // Validar que el ID sea un ObjectId válido
                if (!ObjectId.isValid(value)) {
                    throw new Error('El ID debe ser un ObjectId válido');
                }
                return true;
            }),

            body('remitenteId')
                .optional()
                .custom((value) => {
                    // Validar que el remitenteId sea un ObjectId válido
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El remitenteId debe ser un ObjectId válido');
                    }
                    return true;
                }),

            body('receptorId')
                .optional()
                .custom((value) => {
                    // Validar que el receptorId sea un ObjectId válido
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El receptorId debe ser un ObjectId válido');
                    }
                    return true;
                }),

            body('contenido')
                .optional()
                .isString().withMessage('El contenido debe ser un string')
                .notEmpty().withMessage('El contenido no debe estar vacío si se proporciona'),

            body('fecha')
                .optional()
                .isISO8601().withMessage('La fecha debe ser una fecha válida en formato ISO 8601'),

            // Asegurarse de que no se envíen parámetros en la URL
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíes parámetros en la URL');
                }
                return true;
            }),
        ];
    };
}

module.exports = MessageValidator;
