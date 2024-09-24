const {body , query, param }= require('express-validator');
const { ObjectId } = require('mongodb');

class WorkshopValidator{

    validateAspecificWorkshopDataEmpty = () =>{
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
    

    validateWorkshopDataEmpty = () => {
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

validatingWorkshopData = () => {
    return [
        body('nombre')
            .notEmpty().withMessage('El nombre es obligatorio')
            .isString().withMessage('El nombre debe ser un string'),

        body('descripcion')
            .notEmpty().withMessage('La descripción es obligatoria')
            .isString().withMessage('La descripción debe ser un string'),

        body('modalidad')
            .notEmpty().withMessage('La modalidad es obligatoria')
            .isString().withMessage('La modalidad debe ser un string'),

        body('lugar')
            .notEmpty().withMessage('El lugar es obligatorio')
            .isString().withMessage('El lugar debe ser un string'),

        body('fechaInicio')
            .notEmpty().withMessage('La fecha de inicio es obligatoria')
            .isString().withMessage('La fecha de inicio debe ser un string'),

        body('horario')
            .notEmpty().withMessage('El horario es obligatorio')
            .isString().withMessage('El horario debe ser un string'),

        body('duracion')
            .notEmpty().withMessage('La duración es obligatoria')
            .isString().withMessage('La duración debe ser un string'),

        body('materialesProporcionados')
            .optional()
            .isArray().withMessage('Puedes insertar más de un material')
            .custom((materialesProporcionados) => {
                materialesProporcionados.forEach((material) => {
                    if (typeof material !== 'string') {
                        throw new Error('Cada material debe ser una cadena de texto');
                    }
                });
                return true;
            }),

        body('materialesRequeridos')
            .optional()
            .isArray().withMessage('Puedes insertar más de un material')
            .custom((materialesRequeridos) => {
                materialesRequeridos.forEach((material) => {
                    if (typeof material !== 'string') {
                        throw new Error('Cada material debe ser una cadena de texto');
                    }
                });
                return true;
            }),

        body('documental')
            .optional()
            .isURL().withMessage('La URL del documental no es válida'),

        body('imagen')
            .notEmpty().withMessage('La imagen es obligatoria')
            .isURL().withMessage('La URL de la imagen no es válida'),

        body('artesanoId')
            .notEmpty().withMessage('El artesanoId es obligatorio')
            .custom((value) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('El artesanoId debe ser un ObjectId válido');
                }
                return true;
            }),

        body('publico')
            .notEmpty().withMessage('El público es obligatorio')
            .isString().withMessage('El público debe ser un string')
    ];
}

}
module.exports = WorkshopValidator;