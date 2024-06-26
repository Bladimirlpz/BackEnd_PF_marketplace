const { contactoUsuario } = require("../models/contact.model");

const postContact = async (req, res) => {
  try {
    const contacto = req.body;
    await contactoUsuario(contacto);
    res.status(200).send({ message: "Datos de contacto registrado con éxito" });
  } catch (error) {
    res.status(401).json({ message: "No se registró el contacto" });
  }
};

module.exports = {
  postContact,
};