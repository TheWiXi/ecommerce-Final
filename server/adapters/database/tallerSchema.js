const mongoose = require("mongoose");

const TallerSchema = mongoose.Schema({
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    modalidad: {
      type: String,
      enum: ['presencial', 'virtual'],
      required: true,
    },
    fechaInicio: {
      type: String,
      required: true,
    },
    
    duracion: {
      type: String,
      required: true,
    },
    materialesProporcionados: [{
      type: String,
    }],
    materialesRequeridos: [{
      type: String,
    }],
    documental: {
      type: String,
      default: '',
    },
   imagen: {
      type: String,
      default: '',
    },
    artesanoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuario',
      required: true,
    },
    publico:{
      type: String,
      default:'',

    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('taller', TallerSchema, 'taller');
  