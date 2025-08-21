const express = require('express');
const router = express.Router();
const db = require('../db'); // asegúrate de que la ruta sea correcta

// Ruta de prueba
router.get('/test-db', async (req, res) => {
  try {
    const result = await db.raw('SELECT 1+1 AS result');
    res.json({ success: true, db: result[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/usuarios", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
