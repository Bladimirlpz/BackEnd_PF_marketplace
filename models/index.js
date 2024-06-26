const pool = require("../config/db.config");
const bcrypt = require("bcryptjs");

// Funciones para Usuarios
const getUserByEmail = async (email) => {
  const value = [email];
  const query = "SELECT * FROM Usuarios WHERE email = $1;";
  const { rows } = await pool.query(query, value);
  return rows;
};

const createUser = async (user) => {
  const { nombre, apellido, email, contraseña } = user;
  const hashedPassword = bcrypt.hashSync(contraseña);
  const values = [nombre, apellido, email, hashedPassword];
  const query = "INSERT INTO Usuarios VALUES (DEFAULT, $1, $2, $3, $4)";
  await pool.query(query, values);
};

const obtenerUsuario = async (email) => {
  const value = [email];
  const query = "SELECT * FROM Usuarios WHERE email = $1;";
  const { rows } = await pool.query(query, value);
  return rows;
};

// Funciones para Productos
const obtenerProductos = async () => {
  const query = "SELECT * FROM Productos;";
  const { rows } = await pool.query(query);
  return rows;
};

const publicarProducto = async (producto) => {
  const { nombre, descripcion, precio, stock, imagen, categoria, usuario_id } = producto;
  const values = [nombre, descripcion, precio, stock, imagen, categoria, usuario_id];
  const query = "INSERT INTO Productos VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)";
  await pool.query(query, values);
};

const productosPublicado = async (id) => {
  const values = [id];
  const query = "SELECT p.id, p.nombre_producto, p.descripcion, p.precio, p.imagen, p.categoria FROM Productos p JOIN Usuarios u ON p.usuario_id = u.id WHERE u.id = $1;";
  const { rows } = await pool.query(query, values);
  return rows;
};

// Funciones para Contactos
const contactoUsuario = async (contacto) => {
  const { nombre, email, mensaje } = contacto;
  const values = [nombre, email, mensaje];
  const query = "INSERT INTO Contactos (nombre, email, mensaje) VALUES ($1, $2, $3)";
  await pool.query(query, values);
};

// Funciones para Carrito
const registrarPedido = async (pedidos, id) => {
  const usuario_id = id;
  const value = [usuario_id];
  const query = "INSERT INTO Carrito (usuario_id, fecha_creacion) VALUES ($1, CURRENT_DATE) RETURNING id";
  const { rows: carrito } = await pool.query(query, value);
  const carrito_id = carrito[0].id;
  for (const pedido of pedidos) {
    const { id, cantidad } = pedido;
    const values = [carrito_id, id, cantidad];
    const query = "INSERT INTO productos_en_carrito (carrito_id, producto_id, cantidad) VALUES ($1, $2, $3)";
    await pool.query(query, values);
  }
};

module.exports = {
  getUserByEmail,
  createUser,
  obtenerUsuario,
  obtenerProductos,
  publicarProducto,
  productosPublicado,
  contactoUsuario,
  registrarPedido,
};