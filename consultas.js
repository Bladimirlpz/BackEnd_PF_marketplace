const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

const pool = new Pool({
  host: process.env.HOST,
  password: process.env.PASSWORD,
  user: process.env.USER,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
});

// Funcion para traer todos los productos
const obtenerProductos = async () => {
  const consulta = "SELECT * FROM Productos;";
  const value = [];
  const { rowCount, rows } = await pool.query(consulta, value);
  if (!rowCount) {
    throw { code: 204, message: "No existen productos" };
  } else {
    return rows;
  }
};

// Funcion para verificar usuario
const verificarUsuario = async (email, contraseña) => {
  const value = [email];
  const consulta = "SELECT * FROM usuarios WHERE email = $1;";
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consulta, value);
  const { contrasena: contraseñaEncriptada } = usuario;
  const contraseñaCorrecta = bcrypt.compareSync(
    contraseña,
    contraseñaEncriptada
  );
  if (!contraseñaCorrecta || !rowCount) {
    throw new Error("Contraseña incorrecta");
  }
  const token = jwt.sign(
    {
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      id: usuario.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
  return token;
};

// Funcion para Registrar usuario
const registrarUsuario = async (usuario) => {
  let { nombre, apellido, email, contraseña } = usuario;
  const contraseñaEncriptada = bcrypt.hashSync(contraseña);
  contraseña = contraseñaEncriptada;
  const values = [nombre, apellido, email, contraseñaEncriptada];
  const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)";
  await pool.query(consulta, values);
};

// Funcion para Publicar Producto
const publicarProducto = async (producto) => {
  let { nombre, descripcion, precio, stock, imagen, categoria, id } = producto;
  const usuario_id = id;
  const values = [
    nombre,
    descripcion,
    precio,
    stock,
    imagen,
    categoria,
    usuario_id,
  ];
  const consulta =
    "INSERT INTO productos values (DEFAULT, $1, $2, $3, $4, $5, $6, $7);";
  await pool.query(consulta, values);
};

// Funcion para Contacto usuarios
const contactoUsuario = async (producto) => {
  let { nombre, email, mensaje } = producto;
  const values = [nombre, email, mensaje];
  const consulta =
    "INSERT INTO contactos (nombre, email, mensaje) VALUES ($1, $2, $3);";
  await pool.query(consulta, values);
};

// Funcion para traer los productos publicados por usuario especifico
const productosPublicado = async (id) => {
  const values = [id];
  const consulta =
    "SELECT p.id, p.nombre_producto, p.descripcion, p.precio, p.imagen, p.categoria FROM Productos p JOIN Usuarios u ON p.usuario_id = u.id WHERE u.id = $1;";
  const { rowCount, rows } = await pool.query(consulta, values);
  if (!rowCount) {
    throw { code: 204, message: "No existen productos" };
  } else {
    return rows;
  }
};

// Funcion para obtener datos de  usuario
const obtenerUsuario = async (email) => {
  const value = [email];
  const consulta = "SELECT * FROM Usuarios WHERE email = $1;";
  const { rows } = await pool.query(consulta, value);
  return rows;
};

// Funcion para registrar pedido del carrito
const registrarPedido = async (pedidos, id) => { //En desarrollo
  const usuario_id = id;
  const value = [usuario_id]
  const consulta = 'INSERT INTO carrito (usuario_id, fecha_creacion) VALUES ($1, CURRENT_DATE) RETURNING id'
  const { rows: carrito } = await pool.query(consulta, value);
  const carrito_id = carrito[0].id
  for (const pedido of pedidos) {
    console.log(carrito_id)
    const { id, cantidad } = pedido
    const values = [carrito_id, id, cantidad]
    consulta =  'INSERT INTO productos_en_carrito (carrito_id, producto_id, cantidad) VALUES ($1, $2, $3)'
    await pool.query(consulta, values)
  }

}

module.exports = {
  obtenerProductos,
  verificarUsuario,
  registrarUsuario,
  publicarProducto,
  contactoUsuario,
  productosPublicado,
  obtenerUsuario,
  registrarPedido,
};
