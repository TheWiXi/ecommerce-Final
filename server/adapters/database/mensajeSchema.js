const mongoose = require("mongoose");

const MensajeSchema = mongoose.Schema({
  message: String,
  user: String,
  createdAt: { type: Date, default: Date.now },
  }, { timestamps: true });
  
  module.exports = mongoose.model('mensaje', MensajeSchema);
  