const { body, query, param } = require('express-validator');
const { ObjectId } = require('mongodb');

/**
 * Validador de cupones.
 */
class CouponsValidator {

    /**
     * Valida que el cuerpo de la solicitud y los parámetros de consulta estén vacíos.
     * @returns {Array} Un array de validaciones.
     */
    validateCouponDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                // 🚫 Verifica si se ha enviado algo en el cuerpo de la solicitud.
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                // 🚫 Verifica si se han enviado parámetros de consulta.
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    /**
     * Valida el ID del cupón.
     * @returns {Array} Un array de validaciones.
     */
    validateCouponId = () => {
        return [
            param('id').custom((value, { req }) => {
                // 🆔 Verifica si el ID es un ObjectId válido.
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                // 🚫 Verifica si se han enviado parámetros de consulta.
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                // 🚫 Verifica si se ha enviado algo en el cuerpo de la solicitud.
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    /**
     * Valida los datos del cupón.
     * @returns {Array} Un array de validaciones.
     */
    validateCouponData = () => {
        return [
            body('codigo')
                .notEmpty().withMessage('El código es obligatorio') // 📝 Verifica que el código no esté vacío.
                .isString().withMessage('El código debe ser un string'), // 🔤 Verifica que el código sea un string.

            body('descuento')
                .optional()
                .custom(value => {
                    // 🔢 Permitir que el valor sea un número o una cadena.
                    if (typeof value === 'number' || typeof value === 'string') {
                        return true; // ✅ Es válido.
                    }
                    throw new Error('El descuento debe ser un número o una cadena si se proporciona');
                }),

            body('tipo')
                .notEmpty().withMessage('El tipo es obligatorio') // 📝 Verifica que el tipo no esté vacío.
                .isString().withMessage('El tipo debe ser un string') // 🔤 Verifica que el tipo sea un string.
                .isIn(['general', 'asignado']).withMessage('El tipo debe ser "general" o "asignado"'), // 🔍 Verifica que el tipo sea uno de los valores permitidos.

            body('fechaExpiracion')
                .notEmpty().withMessage('La fecha de expiración es obligatoria') // 📝 Verifica que la fecha de expiración no esté vacía.
                .isString().withMessage('El tipo debe ser un string'), // 🔤 Verifica que la fecha de expiración sea un string.

            body('usuarioId')
                .optional()
                .custom((value) => {
                    // 🆔 Verifica que el usuarioId sea un ObjectId válido.
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El usuarioId debe ser un ObjectId válido');
                    }
                    return true;
                }),

            body('imagen')
                .optional()
                .isString().withMessage('La imagen debe ser una URL válida') // 🌐 Verifica que la imagen sea un string.
                .isURL().withMessage('La imagen debe ser una URL válida') // 🌐 Verifica que la imagen sea una URL válida.
        ];
    }

    /**
     * Valida el ID del cupón compuesto.
     * @returns {Array} Un array de validaciones.
     */
    validateCompoundtId = () => {
        return [
            param('id').custom((value, { req }) => {
                // 🆔 Verifica si el ID es un ObjectId válido.
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                // 🚫 Verifica si se han enviado parámetros de consulta.
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                // 🚫 Verifica si se ha enviado algo en el cuerpo de la solicitud.
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    /**
     * Valida los datos de actualización del cupón por ID.
     * @returns {Array} Un array de validaciones.
     */
    validateCoupounUpdateDataByID = () => {
        return [
            param('id').custom((value) => {
                // 🆔 Verifica si el ID es un ObjectId válido.
                if (!ObjectId.isValid(value)) {
                    throw new Error('El ID debe ser un ObjectId válido');
                }
                return true;
            }),

            body('codigo')
                .optional()
                .isString().withMessage('El código debe ser un string') // 🔤 Verifica que el código sea un string.
                .notEmpty().withMessage('El código no debe estar vacío si se proporciona'), // 📝 Verifica que el código no esté vacío si se proporciona.

            body('descuento')
                .optional()
                .custom(value => {
                    // 🔢 Permitir que el valor sea un número o una cadena.
                    if (typeof value === 'number' || typeof value === 'string') {
                        return true; // ✅ Es válido.
                    }
                    throw new Error('El descuento debe ser un número o una cadena si se proporciona');
                }),

            body('tipo')
                .optional()
                .isString().withMessage('El tipo debe ser un string') // 🔤 Verifica que el tipo sea un string.
                .isIn(['general', 'asignado']).withMessage('El tipo debe ser "general" o "asignado"'), // 🔍 Verifica que el tipo sea uno de los valores permitidos.

            body('fechaExpiracion')
                .optional()
                .isString().withMessage('El tipo debe ser un string'), // 🔤 Verifica que la fecha de expiración sea un string.

            body('usuarioId')
                .optional()
                .custom((value) => {
                    // 🆔 Verifica que el usuarioId sea un ObjectId válido.
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El usuarioId debe ser un ObjectId válido');
                    }
                    return true;
                }),

            body('imagen')
                .optional()
                .isURL().withMessage('La imagen debe ser un URL válido'), // 🌐 Verifica que la imagen sea una URL válida.

            query().custom((value, { req }) => {
                // 🚫 Verifica si se han enviado parámetros de consulta.
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíes parámetros en la URL');
                }
                return true;
            }),
        ];
    };
}

module.exports = CouponsValidator; // 📦 Exporta el validador de cupones.
