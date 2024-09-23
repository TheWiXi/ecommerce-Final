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
      ref: 'Usuario',
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Cupon', CuponSchema);
  