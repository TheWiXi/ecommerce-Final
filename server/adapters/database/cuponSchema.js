const mongoose = require("mongoose");

// * Esquema del cupón
// ? Definimos la estructura que tendrán los cupones en la base de datos

const CuponSchema = mongoose.Schema({
  // * Código del cupón
  // ! Campo obligatorio y único
  codigo: {
    type: String,
    required: true,  // ! Este campo es obligatorio
    unique: true,    // ! Debe ser único, no puede repetirse
  },
  
  // * Descuento del cupón
  // ? Representa el porcentaje o valor de descuento
  descuento: { 
    type: Number,
    required: false, // TODO: No es obligatorio (algunos cupones podrían no tener descuento)
    min: 0,          // ! No se permite un descuento negativo
  },

  // * Tipo de cupón
  // ? Puede ser 'general' para todos los usuarios o 'asignado' a un usuario específico
  tipo: {
    type: String,
    enum: ['general', 'asignado'],  // ? Solo permite estos dos valores
    required: true,                 // ! Campo obligatorio
  },

  // * Fecha de expiración
  // ? Indica hasta cuándo es válido el cupón
  fechaExpiracion: {
    type: String,    // TODO: Considera usar Date en lugar de String para facilitar comparaciones
    required: true,  // ! Campo obligatorio
  },

  // * ID del usuario
  // ? Solo se usa si el cupón es del tipo 'asignado', se relaciona con el modelo 'usuario'
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId, // ? Referencia a un usuario específico
    ref: 'usuario',  // ? El ID debe hacer referencia al esquema de 'usuario'
  },

  // * Imagen del cupón
  // ? Puede ser opcional, se usa para almacenar una imagen representativa del cupón
  imagen: {
    type: String,  
    required: false,  // TODO: Campo opcional
  },
}, { timestamps: true });  // * timestamps añade automáticamente 'createdAt' y 'updatedAt'

// * Exportamos el modelo 'cupon' para poder usarlo en otras partes del proyecto
module.exports = mongoose.model('cupon', CuponSchema, "cupon");
