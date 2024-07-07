const express = require('express');
const router = express.Router();
const fs = require('fs');
const Comida = require('../modelos/comidas'); 

router.get('/cargar', async (req, res) => {
    try {
        const data = fs.readFileSync('./src/platos.json', 'utf8');
        const comidas = JSON.parse(data);

        await Comida.insertMany(comidas);
        res.send('Datos de comidas cargados correctamente en MongoDB');
    } catch (err) {
        console.error('Error al cargar los comidas en MongoDB:', err);
        res.status(500).send('Error al cargar los comidas en MongoDB');
    }
});

router.get('/', async (req, res) => {
    try {
        const comidas = await Comida.find();
        res.json(comidas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;