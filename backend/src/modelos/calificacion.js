const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meseroSchema = new Schema({
  Nombre: { type: String, required: true, unique: true }, 
  Edad: { type: Number, required: true },
  Antiguedad: { type: Number, required: true },
  Calificacion: { type: Number, default: 0 },
  Participacion: { type: Number, default: 0 }
});

module.exports = mongoose.model('Mesero', meseroSchema);