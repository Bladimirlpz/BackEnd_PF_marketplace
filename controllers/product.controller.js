const { obtenerProductos, publicarProducto, productosPublicado, eliminarProducto } = require("../models/index.js");

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

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;
    const result = await eliminarProducto(productId, userId);

    if (result) {
      res.status(200).json({ message: "Producto eliminado con éxito" });
    } else {
      res.status(404).json({ message: "Producto no encontrado o no pertenece al usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
  }
};

module.exports = {
  getProducts,
  postProduct,
  getProductsByUser,
  deleteProduct,
};