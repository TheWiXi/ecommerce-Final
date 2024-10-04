const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");

/**
 * Clase que contiene validaciones para los talleres.
 */
class WorkshopValidator {
  /**
   * Valida que no se envíe nada en el cuerpo y en la URL.
   * @returns {Array} - Un array de validaciones.
   */
  validateAspecificWorkshopDataEmpty = () => {
    return [
      body().custom((value, { req }) => {
        // Verifica que no se envíe nada en el cuerpo de la solicitud
        if (Object.keys(req.body).length > 0) {
          throw new Error("Do not send anything in the body"); // ❌ No envíes nada en el cuerpo
        }
        return true; // ✔️ Es válido
      }),
      query().custom((value, { req }) => {
        // Verifica que no se envíen datos en la URL
        if (Object.keys(req.query).length > 0) {
          throw new Error(`Don't send anything in the url`); // ❌ No envíes nada en la URL
        }
        return true; // ✔️ Es válido
      }),
    ];
  };

  /**
   * Valida los datos del taller.
   * @returns {Array} - Un array de validaciones.
   */
  validatingWorkshopData = () => {
    return [
      body("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio") // ❌ El nombre es obligatorio
        .isString()
        .withMessage("El nombre debe ser un string"), // 🟡 El nombre debe ser una cadena

      body("descripcion")
        .notEmpty()
        .withMessage("La descripción es obligatoria") // ❌ La descripción es obligatoria
        .isString()
        .withMessage("La descripción debe ser un string"), // 🟡 La descripción debe ser una cadena

      body("modalidad")
        .notEmpty()
        .withMessage("La modalidad es obligatoria") // ❌ La modalidad es obligatoria
        .isString()
        .withMessage("La modalidad debe ser un string"), // 🟡 La modalidad debe ser una cadena

      body("lugar")
        .notEmpty()
        .withMessage("El lugar es obligatorio") // ❌ El lugar es obligatorio
        .isString()
        .withMessage("El lugar debe ser un string"), // 🟡 El lugar debe ser una cadena

      body("fechaInicio")
        .notEmpty()
        .withMessage("La fecha de inicio es obligatoria") // ❌ La fecha de inicio es obligatoria
        .isString()
        .withMessage("La fecha de inicio debe ser un string"), // 🟡 La fecha de inicio debe ser una cadena

      body("horario")
        .notEmpty()
        .withMessage("El horario es obligatorio") // ❌ El horario es obligatorio
        .isString()
        .withMessage("El horario debe ser un string"), // 🟡 El horario debe ser una cadena

      body("duracion")
        .notEmpty()
        .withMessage("La duración es obligatoria") // ❌ La duración es obligatoria
        .isString()
        .withMessage("La duración debe ser un string"), // 🟡 La duración debe ser una cadena

      body("materialesProporcionados")
        .optional()
        .isArray()
        .withMessage("Puedes insertar más de un material") // 🟡 Puedes insertar más de un material
        .custom((materialesProporcionados) => {
          // Verifica que cada material sea una cadena
          materialesProporcionados.forEach((material) => {
            if (typeof material !== "string") {
              throw new Error("Cada material debe ser una cadena de texto"); // ❌ Cada material debe ser una cadena
            }
          });
          return true; // ✔️ Es válido
        }),

      body("materialesRequeridos")
        .optional()
        .isArray()
        .withMessage("Puedes insertar más de un material") // 🟡 Puedes insertar más de un material
        .custom((materialesRequeridos) => {
          // Verifica que cada material sea una cadena
          materialesRequeridos.forEach((material) => {
            if (typeof material !== "string") {
              throw new Error("Cada material debe ser una cadena de texto"); // ❌ Cada material debe ser una cadena
            }
          });
          return true; // ✔️ Es válido
        }),

      body("documental")
        .optional()
        .isURL()
        .withMessage("La URL del documental no es válida"), // 🟡 La URL del documental debe ser válida

      body("imagen")
        .notEmpty()
        .withMessage("La imagen es obligatoria") // ❌ La imagen es obligatoria
        .isURL()
        .withMessage("La URL de la imagen no es válida"), // 🟡 La URL de la imagen debe ser válida

      body("artesanoId")
        .notEmpty()
        .withMessage("El artesanoId es obligatorio") // ❌ El artesanoId es obligatorio
        .custom((value) => {
          // Verifica que el artesanoId sea un ObjectId válido
          if (!ObjectId.isValid(value)) {
            throw new Error("El artesanoId debe ser un ObjectId válido"); // ❌ El artesanoId debe ser un ObjectId válido
          }
          return true; // ✔️ Es válido
        }),

      body("publico")
        .notEmpty()
        .withMessage("El público es obligatorio") // ❌ El público es obligatorio
        .isString()
        .withMessage("El público debe ser un string"), // 🟡 El público debe ser una cadena
    ];
  };

  /**
   * Valida los datos para eliminar un taller.
   * @returns {Array} - Un array de validaciones.
   */
  workshopDeleter = () => {
    return [
      param("id").custom((value, { req }) => {
        // Verifica que el ID sea un ObjectId válido
        if (!ObjectId.isValid(value)) {
          throw new Error("Submit a valid ID"); // ❌ Debe enviar un ID válido
        }
        return true; // ✔️ Es válido
      }),
      query().custom((value, { req }) => {
        // Verifica que no se envíen datos en la URL
        if (Object.keys(req.query).length > 0) {
          throw new Error("Dont send anything in the url"); // ❌ No envíes nada en la URL
        }
        return true; // ✔️ Es válido
      }),
      body().custom((value, { req }) => {
        // Verifica que no se envíen datos en el cuerpo de la solicitud
        if (Object.keys(req.body).length > 0) {
          throw new Error("Do not send anything in the body"); // ❌ No envíes nada en el cuerpo
        }
        return true; // ✔️ Es válido
      }),
    ];
  };

  /**
   * Valida los datos para actualizar un taller por ID.
   * @returns {Array} - Un array de validaciones.
   */
  validateUpdateWorkshopsById = () => {
    return [
      param('id').custom((value) => {
        // Verifica que el ID sea un ObjectId válido
        if (!ObjectId.isValid(value)) {
          throw new Error('Envía un ID válido'); // ❌ Debe enviar un ID válido
        }
        return true; // ✔️ Es válido
      }),
      body("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio") // ❌ El nombre es obligatorio
        .isString()
        .withMessage("El nombre debe ser un string"), // 🟡 El nombre debe ser una cadena

      body("descripcion")
        .notEmpty()
        .withMessage("La descripción es obligatoria") // ❌ La descripción es obligatoria
        .isString()
        .withMessage("La descripción debe ser un string"), // 🟡 La descripción debe ser una cadena

      body("modalidad")
        .notEmpty()
        .withMessage("La modalidad es obligatoria") // ❌ La modalidad es obligatoria
        .isString()
        .withMessage("La modalidad debe ser un string"), // 🟡 La modalidad debe ser una cadena

      body("lugar")
        .notEmpty()
        .withMessage("El lugar es obligatorio") // ❌ El lugar es obligatorio
        .isString()
        .withMessage("El lugar debe ser un string"), // 🟡 El lugar debe ser una cadena

      body("fechaInicio")
        .notEmpty()
        .withMessage("La fecha de inicio es obligatoria") // ❌ La fecha de inicio es obligatoria
        .isString()
        .withMessage("La fecha de inicio debe ser un string"), // 🟡 La fecha de inicio debe ser una cadena

      body("horario")
        .notEmpty()
        .withMessage("El horario es obligatorio") // ❌ El horario es obligatorio
        .isString()
        .withMessage("El horario debe ser un string"), // 🟡 El horario debe ser una cadena

      body("duracion")
        .notEmpty()
        .withMessage("La duración es obligatoria") // ❌ La duración es obligatoria
        .isString()
        .withMessage("La duración debe ser un string"), // 🟡 La duración debe ser una cadena

      body("materialesProporcionados")
        .optional()
        .isArray()
        .withMessage("Puedes insertar más de un material") // 🟡 Puedes insertar más de un material
        .custom((materialesProporcionados) => {
          // Verifica que cada material sea una cadena
          materialesProporcionados.forEach((material) => {
            if (typeof material !== "string") {
              throw new Error("Cada material debe ser una cadena de texto"); // ❌ Cada material debe ser una cadena
            }
          });
          return true; // ✔️ Es válido
        }),

      body("materialesRequeridos")
        .optional()
        .isArray()
        .withMessage("Puedes insertar más de un material") // 🟡 Puedes insertar más de un material
        .custom((materialesRequeridos) => {
          // Verifica que cada material sea una cadena
          materialesRequeridos.forEach((material) => {
            if (typeof material !== "string") {
              throw new Error("Cada material debe ser una cadena de texto"); // ❌ Cada material debe ser una cadena
            }
          });
          return true; // ✔️ Es válido
        }),

      body("documental")
        .optional()
        .isURL()
        .withMessage("La URL del documental no es válida"), // 🟡 La URL del documental debe ser válida

      body("imagen")
        .notEmpty()
        .withMessage("La imagen es obligatoria") // ❌ La imagen es obligatoria
        .isURL()
        .withMessage("La URL de la imagen no es válida"), // 🟡 La URL de la imagen debe ser válida

      body("artesanoId")
        .notEmpty()
        .withMessage("El artesanoId es obligatorio") // ❌ El artesanoId es obligatorio
        .custom((value) => {
          // Verifica que el artesanoId sea un ObjectId válido
          if (!ObjectId.isValid(value)) {
            throw new Error("El artesanoId debe ser un ObjectId válido"); // ❌ El artesanoId debe ser un ObjectId válido
          }
          return true; // ✔️ Es válido
        }),

      body("publico")
        .notEmpty()
        .withMessage("El público es obligatorio") // ❌ El público es obligatorio
        .isString()
        .withMessage("El público debe ser un string"), // 🟡 El público debe ser una cadena
    ];
  };
  getWAllWorkshopsWithTeacherNameControllerValidator = () => {
    return [
       query().custom((value, { req }) => {
            if (Object.keys(req.query).length > 0) {
                throw new Error(`Don't send anything in the url`);
            }
            return true;
        })
    ]
  };  
}

module.exports = WorkshopValidator;
