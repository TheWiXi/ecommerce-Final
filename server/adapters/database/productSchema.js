const mongoose = require('mongoose');

const ProductoSchema =  mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  fotos: [{
    type: String,
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  artesanoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('producto', ProductoSchema, 'producto');
