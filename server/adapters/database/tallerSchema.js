const mongoose = require("mongoose");

// * Esquema de Taller
// ? Este esquema define la estructura de los talleres que se almacenarán en la base de datos.

const TallerSchema = mongoose.Schema({
  // * Nombre del taller
  // ? Almacena el nombre del taller
  nombre: {
    type: String,
    required: true,  // ! Campo obligatorio
  },

  // * Descripción del taller
  // ? Almacena una descripción detallada del taller
  descripcion: {
    type: String,
    required: true,  // ! Campo obligatorio
  },

  // * Modalidad del taller
  // ? Define si el taller es presencial o virtual
  modalidad: {
    type: String,
    enum: ['presencial', 'virtual'],  // ! Solo permite estos dos valores
    required: true,  // ! Campo obligatorio
  },

  // * Fecha de inicio del taller
  // ? Indica la fecha en que comienza el taller
  fechaInicio: {
    type: String,
    required: true,  // ! Campo obligatorio
  },

  // * Duración del taller
  // ? Almacena la duración del taller (por ejemplo, "2 horas", "3 días")
  duracion: {
    type: String,
    required: true,  // ! Campo obligatorio
  },

  // * Materiales proporcionados
  // ? Lista de materiales que serán proporcionados durante el taller
  materialesProporcionados: [{
    type: String,  // ? Cada material es almacenado como una cadena de texto
  }],

  // * Materiales requeridos
  // ? Lista de materiales que los participantes deben traer al taller
  materialesRequeridos: [{
    type: String,  // ? Cada material es almacenado como una cadena de texto
  }],

  // * Documental del taller
  // ? Almacena la URL o ruta del documental relacionado con el taller (si lo hay)
  documental: {
    type: String,
    default: '',  // ? Si no se proporciona, el valor será una cadena vacía
  },

  // * Imagen del taller
  // ? URL o ruta de la imagen representativa del taller
  imagen: {
    type: String,
    default: '',  // ? Si no se proporciona, el valor será una cadena vacía
  },

  // * ID del artesano que imparte el taller
  // ? Relaciona el taller con el artesano que lo imparte
  artesanoId: {
    type: mongoose.Schema.Types.ObjectId,  // ? Referencia al modelo de usuario (artesano)
    ref: 'usuario',  // ? Hace referencia al modelo 'usuario'
    required: true,  // ! Campo obligatorio
  },

  // * Público objetivo del taller
  // ? Define el público al que está dirigido el taller (niños, adultos, etc.)
  publico: {
    type: String,
    default: '',  // ? Si no se especifica, se almacena una cadena vacía
  }

}, { timestamps: true });  // * timestamps añade automáticamente 'createdAt' y 'updatedAt'

// * Exportamos el modelo 'taller' para poder usarlo en otras partes del proyecto
module.exports = mongoose.model('taller', TallerSchema, 'taller');
