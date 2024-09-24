const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
      },
      correo: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Por favor ingresa un correo válido'],
      },
      contraseña: {
        type: String,
        required: true,
      },
      fotoPerfil: {
        type: String,
        default: '',
      },
      direccion: {
        type: String,
        default: '',
      },
      telefono: {
        type: String,
        default: '',
      },
      tipo: {
        type: String,
        enum: ['comprador', 'artesano'],
        required: true,
      },
      favoritos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'producto',
      }],
      compras: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pedido',
      }],
      talleresInscritos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'taller',
      }],
      cupones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cupon',
      }],
    }, { timestamps: true });

module.exports = mongoose.model("usuario", UsuarioSchema, 'usuario');