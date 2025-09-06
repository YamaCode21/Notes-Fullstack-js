const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// Para formatear la fecha en las respuestas
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

// Extender dayjs con plugins
dayjs.extend(utc);
dayjs.extend(timezone);


router.get("/", auth, async (req, res) => {
  try {
    const notes = await db("notes")
      .where({ user_id: req.user.id })
      .whereNull("deleted_at")
      .orderBy("created_at", "desc");

    const formatted = notes.map(note => ({
      ...note,
      created_at: note.created_at ? dayjs.utc(note.created_at).tz("America/Lima").format("YYYY-MM-DD HH:mm:ss") : null,
      updated_at: note.updated_at ? dayjs.utc(note.updated_at).tz("America/Lima").format("YYYY-MM-DD HH:mm:ss") : null,
      deleted_at: note.deleted_at ? dayjs.utc(note.deleted_at).tz("America/Lima").format("YYYY-MM-DD HH:mm:ss") : null,
    }))
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las notas" });
  }
});

router.post("/", auth, async (req, res) => {
  const { title, content, pinned } = req.body;
  try {
    const [id] = await db("notes").insert({
      user_id: req.user.id,
      title,
      content,
      pinned: pinned || false,
    });

    const newNote = await db("notes").where({ id }).first();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la nota" });
  }
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { title, content, pinned } = req.body;

  try {
    const updated = await db("notes")
      .where({ id, user_id: req.user.id })
      .update({
        title,
        content,
        pinned,
        updated_at: db.fn.now(),
      });

    if (!updated) return res.status(404).json({ error: "Nota no encontrada" });

    const note = await db("notes").where({ id }).first();
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la nota" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db("notes")
      .where({ id, user_id: req.user.id })
      .update({
        deleted_at: db.fn.now(),
      });

    if (!deleted) return res.status(404).json({ error: "Nota no encontrada" });

    res.json({ message: "Nota eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la nota" });
  }
});

module.exports = router;
