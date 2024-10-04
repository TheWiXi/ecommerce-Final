const mongoose = require('mongoose');

// * Esquema de Producto
// ? Este esquema define la estructura de los productos que se almacenarán en la base de datos.

const ProductoSchema = mongoose.Schema({
  // * Nombre del producto
  // ? Almacena el nombre del producto
  nombre: {
    type: String,
    required: true,  // ! Campo obligatorio
  },

  // * Categoría del producto
  // ? Almacena la categoría a la que pertenece el producto
  categoria: {
    type: String,
    required: true,  // ! Campo obligatorio
  },

  // * Descripción del producto
  // ? Descripción detallada del producto
  descripcion: {
    type: String,
    required: true,  // ! Campo obligatorio
  },

  // * Precio del producto
  // ? Almacena el precio, asegurando que sea un número entero no negativo
  precio: {
    type: Number,
    required: true,  // ! Campo obligatorio
    validate: [
      {
        // * Validación para asegurarse de que el precio sea un número entero
        validator: Number.isInteger,
        message: 'El precio debe ser un número entero',
      },
      {
        // * Validación para asegurarse de que el precio no sea negativo
        validator: v => v >= 0,
        message: 'El precio no puede ser negativo',
      },
    ],
  },

  // * Dimensiones del producto
  // ? Almacena las dimensiones del producto (por ejemplo, tamaño o volumen)
  dimensiones: {  
    type: String,
    required: true,  // ! Campo obligatorio
  },

  // * Foto del producto
  // ? URL o ruta de la imagen del producto
  foto: {
    type: String,
    required: true,  // ! Campo obligatorio
  },

  // * Stock del producto
  // ? Cantidad disponible en inventario
  stock: {
    type: Number,
    required: true,  // ! Campo obligatorio
    min: 0,          // ! El stock no puede ser negativo
  },

  // * Descuento del producto
  // ? Puede ser un valor numérico o una cadena que represente un descuento especial
  descuento: {
    type: mongoose.Schema.Types.Mixed,  // ? Permite diferentes tipos de valores (número o cadena)
    required: true,  // ! Campo obligatorio
    validate: {
      // * Validación para asegurarse de que el descuento sea un número o una cadena
      validator: function(value) {
        return typeof value === 'number' || typeof value === 'string';
      },
      message: 'El descuento debe ser un número o una cadena.',
    },
  },

  // * ID del artesano que creó el producto
  // ? Relaciona el producto con el artesano que lo fabricó
  artesanoId: {
    type: mongoose.Schema.Types.ObjectId,  // ? Referencia al modelo de usuario
    ref: 'usuario',  // ? Hace referencia al artesano (usuario)
    required: true,  // ! Campo obligatorio
  },
}, { timestamps: true });  // * timestamps añade automáticamente 'createdAt' y 'updatedAt'

// * Exportamos el modelo 'producto' para poder usarlo en otras partes del proyecto
module.exports = mongoose.model('producto', ProductoSchema, 'producto');
