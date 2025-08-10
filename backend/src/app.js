require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('API de Notas en Funcionamiento');
})

module.exports = app;