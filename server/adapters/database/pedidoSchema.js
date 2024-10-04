const mongoose = require("mongoose");

// * Esquema de Pedidos
// ? Este esquema define la estructura de los pedidos que se almacenarán en la base de datos.

const PedidoSchema = mongoose.Schema({
  // * ID del usuario
  // ? Relaciona el pedido con el usuario que lo realizó
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId, // ? Referencia a la colección de usuarios
    ref: 'usuario',  // ? Hace referencia al modelo 'usuario'
    required: true,  // ! Campo obligatorio
  },

  // * Productos del pedido
  // ? Contiene un array de productos con sus detalles
  productos: [{
    // * ID del producto
    // ? Referencia al producto seleccionado
    productoId: {
      type: mongoose.Schema.Types.ObjectId,  // ? Referencia a la colección de productos
      ref: 'producto',  // ? Hace referencia al modelo 'producto'
      required: true,   // ! Campo obligatorio
    },

    // * Cantidad del producto
    // ? Cantidad solicitada del producto en el pedido
    cantidad: {
      type: Number,  
      required: true,  // ! Campo obligatorio
      min: 1,          // ! No se permiten cantidades menores a 1
    },

    // * Precio del producto
    // ? Precio del producto en el momento del pedido
    precio: {
      type: mongoose.Types.Decimal128,  // ? Usa Decimal128 para manejar precios con precisión
      required: true,  // ! Campo obligatorio
    },
  }],

  // * Total del pedido
  // ? Suma total del precio de los productos en el pedido
  total: {
    type: mongoose.Types.Decimal128,  // ? Usa Decimal128 para mayor precisión en los cálculos
    required: true,  // ! Campo obligatorio
  },

  // * Fecha del pedido
  // ? Fecha y hora en que se realizó el pedido
  fecha: {
    type: Date,
    default: Date.now,  // ! Por defecto, se asigna la fecha actual
  },

  // * Estado del pedido
  // ? Indica el estado actual del pedido (pendiente, enviado, entregado)
  estado: {
    type: String,
    enum: ['pendiente', 'enviado', 'entregado'],  // ? Solo permite estos tres valores
    default: 'pendiente',  // ! Valor por defecto es 'pendiente'
  },
}, { timestamps: true });  // * timestamps añade automáticamente 'createdAt' y 'updatedAt'

// * Exportamos el modelo 'pedido' para poder usarlo en otras partes del proyecto
module.exports = mongoose.model('pedido', PedidoSchema, 'pedido');
