const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const notes = await db("notes")
    .where({ user_id: req.user.id })
    .amdWhere("deleted_at", null)
    .orderBy("created_at", "desc");
  res.json(notes);
});

module.exports = router;