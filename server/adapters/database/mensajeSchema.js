const mongoose = require("mongoose");

// * Esquema de Mensajes
// ? Este esquema define la estructura de los mensajes que se almacenarán en la base de datos.

const MensajeSchema = mongoose.Schema({
  // * Nombre de usuario
  // ? Almacena el nombre del usuario que envió el mensaje
  username: String, // TODO: Podrías considerar agregar 'required: true' si es obligatorio

  // * Texto del mensaje
  // ? Almacena el contenido del mensaje
  text: String, // TODO: Igual que el anterior, podría requerir una validación adicional

  // * Marca de tiempo
  // ? Indica cuándo se envió el mensaje. Si no se especifica, usa la fecha actual
  timestamp: { 
    type: Date, 
    default: Date.now // ! Por defecto, se asigna la fecha y hora actuales
  },

  // * ID del usuario
  // ? Guarda el identificador único del usuario que envió el mensaje
  userId: String, // ? Este campo almacena el ID del usuario

  // * Indica si el mensaje proviene del servidor
  // ? Si es 'true', el mensaje fue enviado por el servidor en lugar de un usuario
  isServer: { 
    type: Boolean, 
    default: false  // ? Valor por defecto es 'false' (no es del servidor)
  }
}, { timestamps: true });  // * timestamps añade automáticamente 'createdAt' y 'updatedAt'

// * Exportamos el modelo 'Mensajes' para poder usarlo en otras partes del proyecto
module.exports = mongoose.model('Mensajes', MensajeSchema);
