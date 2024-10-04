const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');

class UserValidator {
    /**
     * Valida los datos de inicio de sesión del usuario.
     * @returns {Array} - Un arreglo de validaciones.
     */
    validateUserLogin = () => {
        return [
            body('correo')
                .notEmpty()
                .isEmail()
                .withMessage('Envía el correo que tendrás en el sistema'), // 🟡 Correo requerido

            body('contraseña')
                .notEmpty()
                .isString()
                .isLength({ min: 8 })
                .withMessage('La contraseña debe ser mayor a 8 caracteres'), // 🟡 Contraseña mínima

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`No envíes nada en la URL`); // ❌ No enviar parámetros en la URL
                }
                return true; // ✔️ Validación exitosa
            })
        ];
    };

    /**
     * Valida el correo del usuario.
     * @returns {Array} - Un arreglo de validaciones.
     */
    validateUserEmail = () => {
        return [
            body('correo')
                .notEmpty()
                .isEmail()
                .withMessage('Envía el correo que tendrás en el sistema'), // 🟡 Correo requerido

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`No envíes nada en la URL`); // ❌ No enviar parámetros en la URL
                }
                return true; // ✔️ Validación exitosa
            })
        ];
    };

    /**
     * Valida los datos del usuario.
     * @returns {Array} - Un arreglo de validaciones.
     */
    validateUserData = () => {
        return [
            body('nombre')
                .notEmpty()
                .withMessage('El nombre es obligatorio') // ❌ Nombre requerido
                .isString()
                .withMessage('El nombre debe ser un string'), // 🟡 Debe ser string

            body('correo')
                .notEmpty()
                .withMessage('El correo es obligatorio') // ❌ Correo requerido
                .isEmail()
                .withMessage('El correo debe ser un correo electrónico válido'), // 🟡 Debe ser un email válido

            body('contraseña')
                .notEmpty()
                .withMessage('La contraseña es obligatoria') // ❌ Contraseña requerida
                .isString()
                .withMessage('La contraseña debe ser un string') // 🟡 Debe ser string
                .isLength({ min: 8 })
                .withMessage('La contraseña debe tener al menos 8 caracteres') // 🟡 Longitud mínima
                .custom(async (value, { req }) => {
                    req.body.passwordHash = await bcrypt.hash(value, 10); // ✔️ Hash de la contraseña
                    return true; // ✔️ Validación exitosa
                }),

            body('fotoPerfil')
                .optional()
                .isURL()
                .withMessage('La URL de la foto de perfil no es válida'), // 🟡 Debe ser una URL válida

            body('direccion')
                .optional()
                .isString()
                .withMessage('La dirección debe ser un string'), // 🟡 Debe ser string

            body('telefono')
                .optional()
                .isString()
                .withMessage('El teléfono debe ser un string'), // 🟡 Debe ser string

            body('tipo')
                .notEmpty()
                .withMessage('El tipo de usuario es obligatorio') // ❌ Tipo requerido
                .isString()
                .withMessage('El tipo de usuario debe ser un string') // 🟡 Debe ser string
                .custom((value) => {
                    const validTypes = ['comprador', 'artesano'];
                    if (!validTypes.includes(value)) {
                        throw new Error(`Los tipos válidos de usuario son: ${validTypes.join(', ')}`); // ❌ Tipos válidos
                    }
                    return true; // ✔️ Validación exitosa
                }),

            body('favoritos')
                .optional()
                .isArray()
                .withMessage('Los favoritos deben ser un arreglo de ObjectIds') // 🟡 Debe ser un arreglo
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todos los favoritos deben ser ObjectIds válidos'); // ❌ ObjectIds válidos
                    }
                    return true; // ✔️ Validación exitosa
                }),

            body('compras')
                .optional()
                .isArray()
                .withMessage('Las compras deben ser un arreglo de ObjectIds') // 🟡 Debe ser un arreglo
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todas las compras deben ser ObjectIds válidos'); // ❌ ObjectIds válidos
                    }
                    return true; // ✔️ Validación exitosa
                }),

            body('talleresInscritos')
                .optional()
                .isArray()
                .withMessage('Los talleres inscritos deben ser un arreglo de ObjectIds') // 🟡 Debe ser un arreglo
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todos los talleres inscritos deben ser ObjectIds válidos'); // ❌ ObjectIds válidos
                    }
                    return true; // ✔️ Validación exitosa
                }),

            body('cupones')
                .optional()
                .isArray()
                .withMessage('Los cupones deben ser un arreglo de ObjectIds') // 🟡 Debe ser un arreglo
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todos los cupones deben ser ObjectIds válidos'); // ❌ ObjectIds válidos
                    }
                    return true; // ✔️ Validación exitosa
                }),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíes parámetros en la URL'); // ❌ No enviar parámetros en la URL
                }
                return true; // ✔️ Validación exitosa
            })
        ];
    };

    /**
     * Valida que no se envíen datos del usuario.
     * @returns {Array} - Un arreglo de validaciones.
     */
    validateUserDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('No envíes nada en el cuerpo'); // ❌ No enviar en el cuerpo
                }
                return true; // ✔️ Validación exitosa
            }),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`No envíes nada en la URL`); // ❌ No enviar parámetros en la URL
                }
                return true; // ✔️ Validación exitosa
            })
        ];
    };

    /**
     * Valida el ID del usuario.
     * @returns {Array} - Un arreglo de validaciones.
     */
    validateUserId = () => {
        return [
            param('id').custom((value) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Envía un ID válido'); // ❌ ID no válido
                }
                return true; // ✔️ Validación exitosa
            }),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`No envíes nada en la URL`); // ❌ No enviar parámetros en la URL
                }
                return true; // ✔️ Validación exitosa
            }),

            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('No envíes nada en el cuerpo'); // ❌ No enviar en el cuerpo
                }
                return true; // ✔️ Validación exitosa
            })
        ];
    };

    /**
     * Valida los datos de actualización del usuario por ID.
     * @returns {Array} - Un arreglo de validaciones.
     */
    validateUserUpdateDataById = () => {
        return [
            // Validar _id en la URL
            param('id').custom((value) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Envía un ID válido'); // ❌ ID no válido
                }
                return true; // ✔️ Validación exitosa
            }),

            body('nombre')
                .optional()
                .isString()
                .withMessage('El nombre debe ser un string'), // 🟡 Debe ser string

            body('correo')
                .optional()
                .isEmail()
                .withMessage('Envía un correo electrónico válido'), // 🟡 Debe ser un email válido

            body('fotoPerfil')
                .optional()
                .isURL()
                .withMessage('La URL de la foto de perfil no es válida'), // 🟡 Debe ser una URL válida

            body('direccion')
                .optional()
                .isString()
                .withMessage('La dirección debe ser un string'), // 🟡 Debe ser string

            body('telefono')
                .optional()
                .isString()
                .withMessage('El teléfono debe ser un string'), // 🟡 Debe ser string

            body('tipo')
                .optional()
                .isString()
                .withMessage('El tipo de usuario debe ser un string') // 🟡 Debe ser string
                .custom((value) => {
                    const validTypes = ['comprador', 'artesano'];
                    if (!validTypes.includes(value)) {
                        throw new Error(`Los tipos válidos de usuario son: ${validTypes.join(', ')}`); // ❌ Tipos válidos
                    }
                    return true; // ✔️ Validación exitosa
                }),

            body('favoritos')
                .optional()
                .isArray()
                .withMessage('Los favoritos deben ser un arreglo de ObjectIds') // 🟡 Debe ser un arreglo
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todos los favoritos deben ser ObjectIds válidos'); // ❌ ObjectIds válidos
                    }
                    return true; // ✔️ Validación exitosa
                }),

            body('compras')
                .optional()
                .isArray()
                .withMessage('Las compras deben ser un arreglo de ObjectIds') // 🟡 Debe ser un arreglo
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todas las compras deben ser ObjectIds válidos'); // ❌ ObjectIds válidos
                    }
                    return true; // ✔️ Validación exitosa
                }),

            body('talleresInscritos')
                .optional()
                .isArray()
                .withMessage('Los talleres inscritos deben ser un arreglo de ObjectIds') // 🟡 Debe ser un arreglo
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todos los talleres inscritos deben ser ObjectIds válidos'); // ❌ ObjectIds válidos
                    }
                    return true; // ✔️ Validación exitosa
                }),

            body('cupones')
                .optional()
                .isArray()
                .withMessage('Los cupones deben ser un arreglo de ObjectIds') // 🟡 Debe ser un arreglo
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todos los cupones deben ser ObjectIds válidos'); // ❌ ObjectIds válidos
                    }
                    return true; // ✔️ Validación exitosa
                }),

            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`No envíes nada en la URL`); // ❌ No enviar parámetros en la URL
                }
                return true; // ✔️ Validación exitosa
            }),

            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('No envíes nada en el cuerpo'); // ❌ No enviar en el cuerpo
                }
                return true; // ✔️ Validación exitosa
            })
        ];
    };
}

module.exports = UserValidator;
