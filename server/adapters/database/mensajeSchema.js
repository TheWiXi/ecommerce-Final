const mongoose = require("mongoose");

const MensajeSchema = mongoose.Schema({
  username: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
  userId: String,
  isServer: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model('Mensaje', MensajeSchema);