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
        ref: 'Producto',
      }],
      compras: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
      }],
      talleresInscritos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Taller',
      }],
      cupones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cupon',
      }],
    }, { timestamps: true });

module.exports = mongoose.model("Usuario", UsuarioSchema);