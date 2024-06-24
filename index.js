const express = require("express");
const cors = require("cors");
const {
  obtenerProductos,
  verificarUsuario,
  registrarUsuario,
  publicarProducto,
  contactoUsuario,
  productosPublicado,
  obtenerUsuario,
  registrarPedido,
} = require("./consultas");
const { authMiddleware } = require("./middlewares/auth.middleware");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config({ path: "./.env" });

app.use(cors());
app.use(express.json());

app.listen(3000, console.log("Servidor activo"));

// Ruta GET para obtener todos los productos de la base de datos
app.get("/", async (req, res) => {
  try {
    const productos = await obtenerProductos();
    res.status(201).json(productos);
  } catch (error) {
    res.status(204).send("Productos no encontrados");
  }
});

// Ruta GET para obtener datos del usuario de la base de datos
app.get("/usuario", authMiddleware, async (req, res) => {
  try {
    const authorization = req.headers.authorization.split(" ");
    const token = authorization[1];
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const respuesta = await obtenerUsuario(email);
    res.status(201).json([
      {
        id: respuesta[0].id,
        email: respuesta[0].email,
        nombre: respuesta[0].nombre,
        apellido: respuesta[0].apellido,
      },
    ]);
  } catch (error) {
    res.status(500).send({ message: "Datos no encontrados" });
  }
});

// Ruta POST para login usuario
app.post("/login", async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const token = await verificarUsuario(email, contraseña);
    res.status(201).json({
      message: "Usuario encontrado",
    });
  } catch (error) {
    res.status(401).json({ message: "Usuario no encontrado" });
  }
});

// Ruta POST para registrar usuario
app.post("/registrarse", async (req, res) => {
  try {
    const usuario = req.body;
    await registrarUsuario(usuario);
    res.status(201).json({ message: "Usuario registrado con exito" });
  } catch (error) {
    res.status(401).json({ message: "Email ya registrado" });
  }
});

// Ruta POST para publicar productos
app.post("/publicar", authMiddleware, async (req, res) => {
  try {
    const producto = req.body;
    await publicarProducto(producto);
    res.status(201).json({ message: "Producto publicado con exito" });
  } catch (error) {
    res.status(401).json({ message: "Producto no publicado error en ruta" });
  }
});

// Ruta POST para ingresar contactos
app.post("/contacto", async (req, res) => {
  try {
    const contacto = req.body;
    await contactoUsuario(contacto);
    res.status(201).send({ message: "Datos de contacto registrado con exito" });
  } catch (error) {
    res.status(401).json({ message: "No se regristo el contacto" });
  }
});

// Ruta GET para obtener todos los productos publicados por un usuario en especifico
app.get("/mis-publicaciones", authMiddleware, async (req, res) => {
  try {
    const authorization = req.headers.authorization.split(" ");
    const token = authorization[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const productos = await productosPublicado(id);
    res.status(201).json(productos);
  } catch (error) {
    res.status(404).send("Productos no encontrados");
  }
});

//Ruta POST para ingresar pedido del carrito
app.post("/carrito"),
  authMiddleware,
  async (req, res) => {
    try {
      const authorization = req.headers.authorization.split(" ");
      const token = authorization[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const pedido = req.body;
      await registrarPedido(pedido, id);
      res.status(201).json({ message: "Pedido Registrado con exito" });
    } catch (error) {
      res.status(404).send("Productos no encontrados");
    }
  };

module.exports = app;
