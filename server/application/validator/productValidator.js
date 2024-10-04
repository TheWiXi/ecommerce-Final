const { body, query, param } = require('express-validator');
//const { ObjectId } = require('mongodb');
const { ObjectId } = require('mongoose').Types;

/**
 * Clase para validar los datos del producto.
 */
class ProductValidator {
    /**
     * Valida los datos del producto.
     * @returns {Array} - Un array de validaciones.
     */
    validateProductData = () => {
        return [
            body('nombre')
                .notEmpty().withMessage('El nombre es obligatorio') // ✔️ El nombre es obligatorio
                .isString().withMessage('El nombre debe ser un string'), // ✔️ Debe ser un string

            body('categoria')
                .notEmpty().withMessage('La categoría es obligatoria') // ✔️ La categoría es obligatoria
                .isString().withMessage('La categoría debe ser un string'), // ✔️ Debe ser un string

            body('descripcion')
                .notEmpty().withMessage('La descripción es obligatoria') // ✔️ La descripción es obligatoria
                .isString().withMessage('La descripción debe ser un string'), // ✔️ Debe ser un string
    
            body('precio')
                .notEmpty().withMessage('El precio es obligatorio') // ✔️ El precio es obligatorio
                .isNumeric().withMessage('El precio debe ser un número') // ✔️ Debe ser un número
                .custom((value) => {
                    if (value <= 0) {
                        throw new Error('El precio debe ser un número mayor que cero'); // ❌ El precio debe ser mayor que cero
                    }
                    return true; // ✔️ Es válido
                }),
    
            body('dimensiones')
                .notEmpty().withMessage('Las dimensiones son obligatorias') // ✔️ Las dimensiones son obligatorias
                .isString().withMessage('Las dimensiones deben ser un string'), // ✔️ Debe ser un string
    
            body('foto')
                .notEmpty().withMessage('La foto es obligatoria') // ✔️ La foto es obligatoria
                .isURL().withMessage('La foto debe ser una URL válida'), // ✔️ Debe ser una URL válida
    
            body('stock')
                .notEmpty().withMessage('El stock es obligatorio') // ✔️ El stock es obligatorio
                .isInt().withMessage('El stock debe ser un número entero'), // ✔️ Debe ser un número entero

            body('dimensiones')
                .notEmpty().withMessage('Las dimensiones son obligatorias') // ✔️ Las dimensiones son obligatorias (Corregido)
                .isString().withMessage('Las dimensiones deben ser un string'), // ✔️ Debe ser un string

            body('foto')
                .notEmpty().withMessage('La foto es obligatoria') // ✔️ La foto es obligatoria (Corregido)
                .isString().withMessage('La foto debe ser un string'), // ✔️ Debe ser un string

            body('descuento')
                .optional() // 🟡 Es opcional
                .custom(value => {
                    // Permitir que el valor sea un número o una cadena
                    if (typeof value === 'number' || typeof value === 'string') {
                        return true; // ✔️ Es válido
                    }
                    throw new Error('El descuento debe ser un número o una cadena si se proporciona'); // ❌ Debe ser un número o cadena
                }),

            body('artesanoId')
                .notEmpty().withMessage('El artesanoId es obligatorio') // ✔️ El artesanoId es obligatorio
                .custom((value) => {
                    if (!ObjectId.isValid(value)) {
                        throw new Error('El artesanoId debe ser un ObjectId válido'); // ❌ Debe ser un ObjectId válido
                    }
                    return true; // ✔️ Es válido
                }),
        ];
    };

    /**
     * Valida la categoría del producto.
     * @returns {Array} - Un array de validaciones.
     */
    validateProductCategory = () => {
        return [
            body('categoria').notEmpty().isString().withMessage('Envia la categoria'), // ✔️ La categoría es obligatoria
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`); // ❌ No envíes nada en la URL
                }
                return true; // ✔️ Es válido
            })
        ];
    };

    /**
     * Valida que no se envíen datos del producto.
     * @returns {Array} - Un array de validaciones.
     */
    validateProductDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body'); // ❌ No envíes nada en el cuerpo
                }
                return true; // ✔️ Es válido
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`); // ❌ No envíes nada en la URL
                }
                return true; // ✔️ Es válido
            })
        ];
    };

    /**
     * Valida los datos de actualización del producto por ID.
     * @returns {Array} - Un array de validaciones.
     */
    validateProductUpdateDataByID = () => {
        return [
            param('id').custom((value) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('El ID debe ser un ObjectId válido'); // ❌ El ID debe ser un ObjectId válido
                }
                return true; // ✔️ Es válido
            }),
    
            body('nombre')
            .notEmpty().withMessage('El nombre es obligatorio') // ✔️ El nombre es obligatorio
            .isString().withMessage('El nombre debe ser un string'), // ✔️ Debe ser un string

        body('categoria')
            .notEmpty().withMessage('La categoría es obligatoria') // ✔️ La categoría es obligatoria
            .isString().withMessage('La categoría debe ser un string'), // ✔️ Debe ser un string

        body('descripcion')
            .notEmpty().withMessage('La descripción es obligatoria') // ✔️ La descripción es obligatoria
            .isString().withMessage('La descripción debe ser un string'), // ✔️ Debe ser un string

        body('precio')
            .notEmpty().withMessage('El precio es obligatorio') // ✔️ El precio es obligatorio
            .isInt().withMessage('El stock debe ser un número entero'), // ✔️ Debe ser un número entero

        body('stock')
            .notEmpty().withMessage('El stock es obligatorio') // ✔️ El stock es obligatorio
            .isInt().withMessage('El stock debe ser un número entero'), // ✔️ Debe ser un número entero

        body('dimensiones')
            .notEmpty().withMessage('Las dimensiones son obligatorias') // ✔️ Las dimensiones son obligatorias (Corregido)
            .isString().withMessage('Las dimensiones deben ser un string'), // ✔️ Debe ser un string

        body('foto')
            .notEmpty().withMessage('La foto es obligatoria') // ✔️ La foto es obligatoria (Corregido)
            .isString().withMessage('La foto debe ser un string'), // ✔️ Debe ser un string

        body('descuento')
            .optional() // 🟡 Es opcional
            .custom(value => {
                // Permitir que el valor sea un número o una cadena
                if (typeof value === 'number' || typeof value === 'string') {
                    return true; // ✔️ Es válido
                }
                throw new Error('El descuento debe ser un número o una cadena si se proporciona'); // ❌ Debe ser un número o cadena
            }),

        body('artesanoId')
            .notEmpty().withMessage('El artesanoId es obligatorio') // ✔️ El artesanoId es obligatorio
            .custom((value) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('El artesanoId debe ser un ObjectId válido'); // ❌ Debe ser un ObjectId válido
                }
                return true; // ✔️ Es válido
            }),
        ];
    };

    /**
     * Valida el ID del producto.
     * @returns {Array} - Un array de validaciones.
     */
    validateProductId = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID'); // ❌ Debe enviar un ID válido
                }
                return true; // ✔️ Es válido
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`); // ❌ No envíes nada en la URL
                }
                return true; // ✔️ Es válido
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body'); // ❌ No envíes nada en el cuerpo
                }
                return true; // ✔️ Es válido
            })
        ];
    };
    /**
 * Valida el ID del artesano y el término de búsqueda para productos agrupados.
 * @returns {Array} - Un array de validaciones.
 */
validateProductGroupedIdValidator = () => {
    return [
        param('artesanoId').custom((value) => {
            // Verifica si el ID del artesano es un ObjectId válido
            if (!ObjectId.isValid(value)) {
                throw new Error('Submit a valid artesano ID'); // ❌ Debe enviar un ID de artesano válido
            }
            return true; // ✔️ Es válido
        }),
        param('searchTerm').custom((value) => {
            // Verifica si el término de búsqueda es una cadena no vacía
            if (typeof value !== 'string' || value.trim() === '') {
                throw new Error('Submit a valid search term'); // ❌ Debe enviar un término de búsqueda válido
            }
            return true; // ✔️ Es válido
        }),
        query().custom((value, { req }) => {
            // Verifica que no se envíen datos en la URL
            if (Object.keys(req.query).length > 0) {
                throw new Error(`Don't send anything in the URL`); // ❌ No envíes nada en la URL
            }
            return true; // ✔️ Es válido
        }),
        body().custom((value, { req }) => {
            // Verifica que no se envíen datos en el cuerpo de la solicitud
            if (Object.keys(req.body).length > 0) {
                throw new Error('Do not send anything in the body'); // ❌ No envíes nada en el cuerpo
            }
            return true; // ✔️ Es válido
        })
    ];
};

/**
 * Valida el ID del artesano y el término de búsqueda opcional para encontrar productos agrupados por nombre.
 * @returns {Array} - Un array de validaciones.
 */
validateProductGroupedIdToFindByNameValidator = () => {
    return [
        param('artesanoId').custom((value) => {
            // Verifica si el ID del artesano es un ObjectId válido
            if (!ObjectId.isValid(value)) {
                throw new Error('Submit a valid artesano ID'); // ❌ Debe enviar un ID de artesano válido
            }
            return true; // ✔️ Es válido
        }),
        query('searchTerm').optional().isString().withMessage('Submit a valid search term'), // 🟡 El término de búsqueda es opcional y debe ser una cadena
    ];
};

}

module.exports = new ProductValidator();
