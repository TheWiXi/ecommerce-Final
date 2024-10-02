const mongoose = require("mongoose");

const CuponSchema = mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  descuento: { 
    type: Number,
    required: false, 
    min: 0, 
},
  tipo: {
    type: String,
    enum: ['general', 'asignado'],
    required: true,
  },
  fechaExpiracion: {
    type: String,
    required: true,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usuario',
  },
  imagen: {
    type: String,  
    required: false, 
  },
}, { timestamps: true });
  
  module.exports = mongoose.model('cupon', CuponSchema, "cupon");
  