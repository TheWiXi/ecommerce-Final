const mongoose = require("mongoose");

const MensajeSchema = mongoose.Schema({
  username: String,  // Cambiado de 'user' a 'username' para coincidir
  text: String,      // Cambiado de 'message' a 'text' para coincidir
  timestamp: { type: Date, default: Date.now }  // Cambiado de 'createdAt' a 'timestamp'
}, { timestamps: true });

module.exports = mongoose.model('Mensaje', MensajeSchema);