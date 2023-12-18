const express = require('express');
const mongoose = require('mongoose');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
const PORT = 3000;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/bootcamp', { useNewUrlParser: true, useUnifiedTopology: true });

// Configuración de rutas
app.use('/usuarios', usuariosRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡API en funcionamiento!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
