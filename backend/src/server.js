const express = require('express');
const cors = require('cors');
const app = express();


require('./database');


app.use(cors());
app.use(express.json());


const calificacionRoute = require('./routes/meserosroute');
const meseroRoute = require('./routes/comidaroute');
const pedidoRoute = require('./routes/pedidoroute')
app.use('/meseros', meseroRoute);
app.use('/comidas', comidaRoute);
app.use('/pedidos',pedidoRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
