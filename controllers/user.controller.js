const { obtenerUsuario } = require("../models/index.js");

const getUser = async (req, res) => {
  try {
    const { email } = req.user;
    const respuesta = await obtenerUsuario(email);
    res.status(201).json({
      id: respuesta[0].id,
      email: respuesta[0].email,
      nombre: respuesta[0].nombre,
      apellido: respuesta[0].apellido,
    });
  } catch (error) {
    res.status(500).send({ message: "Datos no encontrados" });
  }
};

module.exports = {
  getUser,
};