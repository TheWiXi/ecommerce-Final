const mongoose = require("mongoose");


const PedidoSchema = mongoose.Schema({
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuario',
      required: true,
    },
    productos: [{
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'producto',
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1,
      },
      precio: {
        type: mongoose.Types.Decimal128,
        required: true,
      },
    }],
    total: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    estado: {
      type: String,
      enum: ['pendiente', 'enviado', 'entregado'],
      default: 'pendiente',
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('pedido', PedidoSchema, 'pedido');
  