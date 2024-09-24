const mongoose = require("mongoose");

const MensajeSchema = mongoose.Schema({
    remitenteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuario',
      required: true,
    },
    receptorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuario',
      required: true,
    },
    contenido: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('mensaje', MensajeSchema, 'mensaje');
  