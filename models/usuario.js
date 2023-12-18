const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  correo: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
