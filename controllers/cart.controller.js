const { registrarPedido } = require("../models/cart.model");

const postCart = async (req, res) => {
  try {
    const { id } = req.user;
    const pedidos = req.body;
    await registrarPedido(pedidos, id);
    res.status(201).json({ message: "Pedido Registrado con éxito" });
  } catch (error) {
    res.status(404).send("Productos no encontrados");
  }
};

module.exports = {
  postCart,
};