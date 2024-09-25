const mongoose = require("mongoose");

const CuponSchema = mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  descuento: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['general', 'asignado'],
    required: true,
  },
  fechaExpiracion: {
    type: Date,
    required: true,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
  },
  imagen: {
    type: String,  // Agrega el campo imagen como String
    required: false,  // Si no es obligatorio, puedes poner 'required: false'
  },
}, { timestamps: true });
  
  module.exports = mongoose.model('cupon', CuponSchema, "cupon");
  