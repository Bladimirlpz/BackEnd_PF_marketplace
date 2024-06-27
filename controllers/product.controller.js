const { obtenerProductos, publicarProducto, productosPublicado } = require("../models/index.js");

const getProducts = async (req, res) => {
  try {
    const productos = await obtenerProductos();
    res.status(201).json(productos);
  } catch (error) {
    res.status(204).send("Productos no encontrados");
  }
};

const postProduct = async (req, res) => {
  try {
    const producto = req.body;
    await publicarProducto(producto);
    res.status(201).json({ message: "Producto publicado con exito" });
  } catch (error) {
    res.status(401).json({ message: "Producto no publicado error en ruta" });
  }
};

const getProductsByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const productos = await productosPublicado(id);
    res.status(201).json(productos);
  } catch (error) {
    res.status(404).send("Productos no encontrados");
  }
};

module.exports = {
  getProducts,
  postProduct,
  getProductsByUser,
};