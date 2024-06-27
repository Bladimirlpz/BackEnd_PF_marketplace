const { contactoUsuario } = require("../models/index.js");

const postContact = async (req, res) => {
  try {
    const contacto = req.body;
    await contactoUsuario(contacto);
    res.status(200).send({ message: "Datos de contacto registrado con exito" });
  } catch (error) {
    res.status(401).json({ message: "No se registró el contacto" });
  }
};

module.exports = {
  postContact,
};