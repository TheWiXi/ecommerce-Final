const mongoose = require("mongoose");

// * Esquema de Usuario
// ? Este esquema define la estructura de los usuarios que se almacenarán en la base de datos.

const UsuarioSchema = mongoose.Schema({
  // * Nombre del usuario
  // ? Almacena el nombre del usuario
  nombre: {
    type: String,
    required: true,  // ! Campo obligatorio
  },

  // * Correo electrónico del usuario
  // ? Almacena el correo electrónico y verifica que sea único y en formato válido
  correo: {
    type: String,
    required: true,  // ! Campo obligatorio
    unique: true,    // ! El correo debe ser único en la base de datos
    match: [/.+\@.+\..+/, 'Por favor ingresa un correo válido'],  // * Validación de formato de correo
  },

  // * Contraseña del usuario
  // ? Almacena la contraseña del usuario (debe estar encriptada)
  contraseña: {
    type: String,
    required: true,  // ! Campo obligatorio
  },

  // * Foto de perfil del usuario
  // ? Almacena la URL o ruta de la imagen de perfil
  fotoPerfil: {
    type: String,
    default: '',  // ? Si no se proporciona, se almacena una cadena vacía
  },

  // * Dirección del usuario
  // ? Almacena la dirección de residencia del usuario
  direccion: {
    type: String,
    default: '',  // ? Si no se proporciona, se almacena una cadena vacía
  },

  // * Teléfono del usuario
  // ? Almacena el número de teléfono del usuario, asegurando que sea único
  telefono: {
    type: String,
    default: '',  // ? Si no se proporciona, se almacena una cadena vacía
    unique: true, // ! El teléfono debe ser único en la base de datos
  },

  // * Tipo de usuario
  // ? Define si el usuario es 'comprador' o 'artesano'
  tipo: {
    type: String,
    enum: ['comprador', 'artesano'],  // ! Solo permite estos dos valores
    required: true,  // ! Campo obligatorio
  },

  // * Productos favoritos del usuario
  // ? Almacena una lista de productos marcados como favoritos
  favoritos: [{
    type: mongoose.Schema.Types.ObjectId,  // ? Relación con el modelo 'producto'
    ref: 'producto',
  }],

  // * Compras realizadas por el usuario
  // ? Almacena una lista de los pedidos que ha realizado el usuario
  compras: [{
    type: mongoose.Schema.Types.ObjectId,  // ? Relación con el modelo 'pedido'
    ref: 'pedido',
    unique: true,  // ! Cada compra debe ser única
  }],

  // * Talleres inscritos por el usuario
  // ? Almacena una lista de los talleres en los que el usuario se ha inscrito
  talleresInscritos: [{
    type: mongoose.Schema.Types.ObjectId,  // ? Relación con el modelo 'taller'
    ref: 'taller',
    unique: true,  // ! Cada taller inscrito debe ser único
  }],

  // * Cupones disponibles para el usuario
  // ? Almacena una lista de cupones que el usuario posee
  cupones: [{
    type: mongoose.Schema.Types.ObjectId,  // ? Relación con el modelo 'cupon'
    ref: 'cupon',
    unique: true,  // ! Cada cupón debe ser único
  }],
}, { timestamps: true });  // * timestamps añade automáticamente 'createdAt' y 'updatedAt'

// * Exportamos el modelo 'usuario' para poder usarlo en otras partes del proyecto
module.exports = mongoose.model("usuario", UsuarioSchema, 'usuario');
