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
} = require("./consultas");
const { authMiddleware } = require("./middlewares/auth.middleware");
require('dotenv').config({ path: './.env' })
const jwt = require('jsonwebtoken')
const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, console.log("Servidor activo"));

// Get para obtener todos los productos de la base de datos
app.get("/", async (req, res) => {
  try {
    const productos = await obtenerProductos();
    res.json(productos);
  } catch (error) {
    res.status(204).send("Productos no encontrados");
  }
});

// Get para obtener datos del usuario de la base de datos
app.get("/usuario", authMiddleware, async (req, res) => {
    try {
        const authorization = req.headers.authorization.split(' ')
        const token = authorization[1]
        const { email } = jwt.verify(token, process.env.JWT_SECRET)
        const respuesta = await obtenerUsuario(email)
        res.status(201).json([{
          id: respuesta[0].id,
          email: respuesta[0].email,
          nombre: respuesta[0].nombre,
          message: 'Bienvenido'
        }])
      } catch (error) {
        res.status(500).send({ message: 'Datos no encontrados' })
      }
});

// Post para login usuario
app.post("/login", async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const token = await verificarUsuario(email, contraseña);
    res.status(200).json({
      message: "Usuario encontrado",
      token,
    });
  } catch (error) {
    res.status(401).json({ message: "Usuario no encontrado" });
  }
});

// Post para registrar usuario
app.post("/registrarse", async (req, res) => {
  try {
    const usuario = req.body;
    await registrarUsuario(usuario);
    res.status(201).json({ message: "Usuario registrado con exito" });
  } catch (error) {
    res.status(401).json({ message: "Usuario no registrado" });
  }
});

// Post para publicar productos
app.post("/publicar", authMiddleware, async (req, res) => {
  try {
    const producto = req.body;
    await publicarProducto(producto);
    res.status(201).json({ message: "Producto publicado con exito" });
  } catch (error) {
    res.status(401).json({ message: "Producto no publicado error en ruta" });
  }
});

// Post para contactos
app.post("/contacto", async (req, res) => {
  try {
    const contacto = req.body;
    await contactoUsuario(contacto);
    res.send("formulario enviado con exito");
  } catch (error) {
    res.status(401).json({ message: "eroor en el envio del formulario" });
  }
});

// Get para obtener todos los productos publicados por un usuario en especifico
app.get("/mis-publicaciones", async (req, res) => {
  try {
    const usuario = req.body;
    const productos = await productosPublicado(usuario);
    res.json(productos);
  } catch (error) {
    res.status(204).send("Productos no encontrados");
  }
});
