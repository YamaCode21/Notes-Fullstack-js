require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Importar rutas
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const testsRoutes = require("./routes/tests");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tests", testsRoutes);

// Middleware de error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salio mal" });
});

app.get("/", (req, res) => {
  res.send("API de Notas en Funcionamiento");
});

module.exports = app;
