const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
    validate: [
      {
        validator: Number.isInteger,
        message: 'El precio debe ser un número entero',
      },
      {
        validator: v => v >= 0,
        message: 'El precio no puede ser negativo',
      },
    ],
  },
  dimensiones: {  
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  descuento: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function(value) {
        // Verificar que el valor sea un número o una cadena
        return typeof value === 'number' || typeof value === 'string';
      },
      message: 'El descuento debe ser un número o una cadena.',
    },
  },
  artesanoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('producto', ProductoSchema, 'producto');
