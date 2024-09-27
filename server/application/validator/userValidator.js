const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs')

class UserValidator {
    validateUserLogin = () => {
        return [
            body('correo').notEmpty().isEmail().withMessage('Send the email you will have in the system'),
            body('contraseña').notEmpty().isString().isLength( {min: 8} ).withMessage('must be greater than 8'),
            
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateUserEmail = () => {
        return [
            body('correo').notEmpty().isEmail().withMessage('Send the email you will have in the system'),      
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateUserData = () => {
        return [  
            body('nombre')
                .notEmpty().withMessage('El nombre es obligatorio')
                .isString().withMessage('El nombre debe ser un string'),
            body('correo')
                .notEmpty().withMessage('El correo es obligatorio')
                .isEmail().withMessage('El correo debe ser un correo electrónico válido'),
            body('contraseña')
                .notEmpty().withMessage('La contraseña es obligatoria')
                .isString().withMessage('La contraseña debe ser un string')
                .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
                .custom(async (value, { req }) => {
                    req.body.passwordHash = await bcrypt.hash(value, 10);
                    return true;
                }),
            body('fotoPerfil')
                .optional()
                .isURL().withMessage('La URL de la foto de perfil no es válida'),
            body('direccion')
                .optional()
                .isString().withMessage('La dirección debe ser un string'),

            body('telefono')
                .notEmpty().withMessage('La telefono es obligatoria')
                .isString().withMessage('El teléfono debe ser un string'),
    
            body('tipo', 'El tipo de usuario es obligatorio')
                .notEmpty()
                .isString().withMessage('El tipo de usuario debe ser un string')
                .custom((value) => {
                    const validTypes = ['comprador', 'artesano'];
                    if (!validTypes.includes(value)) {
                        throw new Error(`Los tipos válidos de usuario son: ${validTypes.join(', ')}`);
                    }
                    return true;
                }),
            body('favoritos')
                .optional()
                .isArray().withMessage('Los favoritos deben ser un arreglo de ObjectIds')
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todos los favoritos deben ser ObjectIds válidos');
                    }
                    return true;
                }),
    
            body('compras')
                .optional()
                .isArray().withMessage('Las compras deben ser un arreglo de ObjectIds')
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todas las compras deben ser ObjectIds válidos');
                    }
                    return true;
                }),
    
            body('talleresInscritos')
                .optional()
                .isArray().withMessage('Los talleres inscritos deben ser un arreglo de ObjectIds')
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todos los talleres inscritos deben ser ObjectIds válidos');
                    }
                    return true;
                }),
    
            body('cupones')
                .optional()
                .isArray().withMessage('Los cupones deben ser un arreglo de ObjectIds')
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todos los cupones deben ser ObjectIds válidos');
                    }
                    return true;
                }),
    
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíes parámetros en la URL');
                }
                return true;
            })
        ];
    };

    validateUserDataEmpty = () => {
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

    validateUserId = () => {
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

    validateUserUpdateDataById = () => {
        return [
            // Validar _id en la URL
            param('id').custom((value) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Envía un ID válido');
                }
                return true;
            }),
    
            body('nombre')
                .optional()
                .isString().withMessage('El nombre debe ser un string'),
    
            body('correo')
                .optional()
                .isEmail().withMessage('Envía un correo electrónico válido'),

            body('fotoPerfil')
                .optional()
                .isURL().withMessage('La URL de la foto de perfil no es válida'),
    
            body('direccion')
                .optional()
                .isString().withMessage('La dirección debe ser un string'),
    
            body('telefono')
                .optional()
                .isString().withMessage('El teléfono debe ser un string'),
    
            body('tipo')
                .optional()
                .isString().withMessage('El tipo de usuario debe ser un string')
                .custom((value) => {
                    const validTypes = ['comprador', 'artesano'];
                    if (value && !validTypes.includes(value)) {
                        throw new Error(`Los tipos válidos de usuario son: ${validTypes.join(', ')}`);
                    }
                    return true;
                }),
    
            body('favoritos')
                .optional()
                .isArray().withMessage('Los favoritos deben ser un arreglo de ObjectIds')
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todos los favoritos deben ser ObjectIds válidos');
                    }
                    return true;
                }),
    
            body('compras')
                .optional()
                .isArray().withMessage('Las compras deben ser un arreglo de ObjectIds')
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todas las compras deben ser ObjectIds válidos');
                    }
                    return true;
                }),
            body('talleresInscritos')
                .optional()
                .isArray().withMessage('Los talleres inscritos deben ser un arreglo de ObjectIds')
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todos los talleres inscritos deben ser ObjectIds válidos');
                    }
                    return true;
                }),
    
            body('cupones')
                .optional()
                .isArray().withMessage('Los cupones deben ser un arreglo de ObjectIds')
                .custom((value) => {
                    if (!value.every(ObjectId.isValid)) {
                        throw new Error('Todos los cupones deben ser ObjectIds válidos');
                    }
                    return true;
                }),
    
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error('No envíes parámetros en la URL');
                }
                return true;
            })
        ];
    };
}

module.exports = UserValidator;