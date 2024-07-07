const express = require('express');
const router = express.Router();
const Pedido = require('../modelos/pedidos'); 

router.post('/', async (req, res) => {
    const { comida, mesero, precio } = req.body;

    if (!comida || !mesero || !precio) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const nuevoPedido = new Pedido({
        comida,
        mesero,
        precio
    });

    try {
        const pedidoGuardado = await nuevoPedido.save();
        res.status(201).json(pedidoGuardado);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;