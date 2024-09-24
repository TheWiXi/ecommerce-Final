const {body, query, params} = require('express-validator');
const {ObjectId} = require ('mongodb');

class TallerValidator{
    validateTallerData(){
        return [
            body('nombre')
            .notEmpty().withMessage('El nombre es obligatorio')
            .isString().withMessage('El nombre debe ser un string'),

            body('descripcion')
            .notEmpty().withMessage('La descripción es obligatoria')
            .isString().withMessage('La descripción debe ser un string'),

            body('modalidad')
             .notEmpty().withMessage('La modalidad es obligatoria')
             .isIn(['presencial', 'online']).withMessage('La modalidad debe ser presencial o online'),

             body('lugar')
             .notEmpty().withMessage('El lugar es obligatorio')
             .isString().withMessage('El lugar debe ser un string'),

             body('fechaInicio')
             .notEmpty().withMessage('La fecha de inicio es obligatoria')
             .isString().withMessage('La fecha debe ser un string'),

             body('horario')
             .notEmpty().withMessage('El horario es obligatorio')
             .isString().withMessage('El horario debe ser un string'),

             body('duracion')
             .notEmpty().withMessage('La duración es obligatoria')
             .isString().withMessage('La duración debe ser un string'),

             body('materialesProporcionados')
             .optional()
             .isArray().withMessage('Los materiales proporcionados deben ser un array'),

            body('materialesRequeridos')
            .optional()
            .isArray().withMessage('Los materiales requeridos deben ser un array'),

             
            body('documental')
            .isString().withMessage('La dirección del video debe ser un string')
            .isURL().withMessage('La dirección del video debe ser una URL válida'),

            body('imagen')
            .notEmpty().withMessage('La imagen es obligatoria')
            .isString().withMessage('La imagen debe ser un string')
            .isURL().withMessage('La imagen debe ser una URL válida'),
            
            
        ]
}

validateTallerDataEmpty = () => {
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
};


module.exports = TallerValidator;