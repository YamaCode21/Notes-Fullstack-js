const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

router.post('/register', async (req, res) => {
  const { emial, password, name } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const [id] = await db('users').insert({ email, password: hash, name });
  res.status(201).json({ id, email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db('users').where({ email }).first();
  if(!user) return res.status(401).json({ message: 'Credenciales invalidas' });

  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(401).json({ message: 'Credenciales invalidas' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

module.exports = router;