const mongoose = require('mongoose');

const comidaSchema = new mongoose.Schema({
    Nombre: { type: String, required: true },
    foto: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true }
});

const Comida = mongoose.model('Comida', comidaSchema);

module.exports = Comida;