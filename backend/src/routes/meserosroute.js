const express = require('express');
const router = express.Router();
const fs = require('fs');
const Mesero = require('../modelos/calificacion');


router.get('/cargar', async (req, res) => {
  try {
    
    const data = fs.readFileSync('./src/meseros.json', 'utf8');
    const meseros = JSON.parse(data);

  
    await Mesero.insertMany(meseros);
    res.send('Datos de meseros cargados correctamente en MongoDB');
  } catch (err) {
    console.error('Error al cargar los meseros en MongoDB:', err);
    res.status(500).send('Error al cargar los meseros en MongoDB');
  }
});
router.get('/nombres', async (req, res) => {
  try {
    const meseros = await Mesero.find({}, 'Nombre'); 
    res.json(meseros);
  } catch (error) {
    console.error('Error al obtener los meseros:', error);
    res.status(500).json({ message: 'Error al obtener los meseros' });
  }
});
router.put('/:id', async (req, res) => {
  const { calificacion, participacion } = req.body;
  const meseroId = req.params.id;

  try {
    const mesero = await Mesero.findById(meseroId);

    if (!mesero) {
      return res.status(404).json({ error: 'Mesero no encontrado' });
    }

    if (calificacion !== undefined) {
      mesero.Calificacion = calificacion;
    }

    if (participacion !== undefined) {
      mesero.Participacion += participacion;  
      mesero.Calificacion = calcularCalificacionActualizada(mesero.Participacion, mesero.Calificacion);
    }

    await mesero.save();
    res.json(mesero);
  } catch (err) {
    console.error('Error al actualizar el mesero:', err);
    res.status(500).json({ error: 'Error al actualizar el mesero' });
  }
});

function calcularCalificacionActualizada(participacion, calificacionActual) {
 
  const participacionesPorAjuste = 5;
  const ajuste = Math.floor(participacion / participacionesPorAjuste);
  const nuevaCalificacion = calificacionActual + ajuste;
  return Math.max(0, Math.min(nuevaCalificacion, 20));
}

module.exports = router;
