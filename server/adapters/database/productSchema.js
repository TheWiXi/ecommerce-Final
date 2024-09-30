const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    nombre: {
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
    },
    categoria: {
        type: String,
        required: true,
    },
    dimensiones: {
        type: String, 
        required: false, 
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
        type: Number,
        required: false, 
        min: 0, 
    },
    artesanoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('producto', ProductoSchema, 'producto');
