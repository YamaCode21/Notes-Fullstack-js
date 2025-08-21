require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar rutas
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const testsRoutes = require('./routes/tests');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/tests', testsRoutes);

app.get('/', (req, res) => {
  res.send('API de Notas en Funcionamiento');
})

module.exports = app;