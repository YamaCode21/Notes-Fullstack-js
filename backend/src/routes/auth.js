const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES = "8h";

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if(!email || !password || !name) {
      return res.status(422).json({
        succes: false,
        message: "Faltan datos obligatorios",
      });
    }

    // Verificar existencia del usuario
    const exists = await db("users").where({ email }).first();
    if (exists)
      return res.status(400).json({ message: "El correo ya esta registrado" });

    // Hashear la contraseña
    const hash = await bcrypt.hash(password, 12);

    // Insertar usuario
    const [id] = await db("users").insert({ email, password: hash, name });
    
    res.status(201).json({
      success: true,
      user: { id, email, name },
      message: "Usuario registrado correctamente",
    });

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// 6:43 AM Nota:sigue el login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db("users").where({ email }).first();
    if (!user)
      return res.status(401).json({ message: "Credenciales invalidas" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Credenciales invalidas" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "8h",
    });
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
