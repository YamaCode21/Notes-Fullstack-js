const knex = require("knex");

const testsDB = async (req, res) => {
  try {
    const users = await knex("users").select("*");
    res.json({ message: "Conexión exitosa 🚀", users });
  } catch (error) {
    res.status(500).json({ message: "Error en la base de datos", error });
  }
};

module.exports = {
  testsDB,
};
