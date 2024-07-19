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

router.get('/obtener', async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.status(200).json(pedidos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const idPedido = req.params.id;

    try {
        const pedidoEliminado = await Pedido.findByIdAndDelete(idPedido);
        if (!pedidoEliminado) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.status(200).json({ message: 'Pedido eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
