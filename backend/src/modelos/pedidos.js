const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    comida: { type: String, required: true },
    mesero: { type: String, required: true },
    precio: { type: Number, required: true }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;