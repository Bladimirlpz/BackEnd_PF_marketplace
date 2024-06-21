const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './.env' })

const pool = new Pool({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    user: process.env.USER,
    database: process.env.DATABASE,
    allowExitOnIdle: true
})

// Funcion para traer todos los productos
const obtenerProductos = async () => {
    const consulta = 'SELECT * FROM Productos'
    const value = []
    const { rowCount, rows } = await pool.query(consulta, value)
    if (!rowCount) {
        throw { code: 204, message: 'No existen productos' }
    } else {
        return rows
    }
}

// Funcion para verificar usuario
const verificarUsuario = async (email, contraseña) => {
    const value = [email]
    const consulta = 'SELECT * FROM Usuarios WHERE email = $1;'
    const { rows: [usuario], rowCount } = await pool.query(consulta, value)
    const { contrasena: contraseñaEncriptada } = usuario
    const contraseñaCorrecta = bcrypt.compareSync(contraseña, contraseñaEncriptada)
    if (!contraseñaCorrecta || !rowCount) {
        throw new Error('Contraseña incorrecta')
    }
    const token = jwt.sign({ email: usuario.email, nombre: usuario.nombre, apellido: usuario.apellido, id: usuario.id}, process.env.JWT_SECRET, { expiresIn: '10h' })
    return token 
}

// Funcion para Registrar usuario
const registrarUsuario = async (usuario) => {
    let { nombre, apellido, email, contraseña } = usuario
    const contraseñaEncriptada = bcrypt.hashSync(contraseña)
    contraseña = contraseñaEncriptada
    const values = [nombre, apellido, email, contraseñaEncriptada]
    const consulta = 'INSERT INTO Usuarios values (DEFAULT, $1, $2, $3, $4)'
    await pool.query(consulta, values)
}

// Funcion para Publicar Producto
const publicarProducto = async (producto) => {
    let { nombre, descripcion, precio, stock, imagen, categoria } = producto
    const values = [nombre, descripcion, precio, stock, imagen, categoria]
    const consulta = 'INSERT INTO Productos values (DEFAULT, $1, $2, $3, $4, $5, $6)'
    await pool.query(consulta, values)
}

// Funcion para Contacto usuarios
const contactoUsuario = async (contacto) => {
    let { nombre, email, mensaje } = producto
    const values = [nombre, email, mensaje]
    const consulta = 'INSERT INTO Contactos values (DEFAULT, $1, $2, $3)'
    await pool.query(consulta, values)
}

// Funcion para traer los productos publicados por usuario especifico
const productosPublicado = async (usuario) => {
    let { id } = usuario
    const values = [id]
    const consulta = 'SELECT p.id, p.nombre_producto, p.descripcion, p.precio, p.imagen, p.categoria FROM Productos p JOIN Usuarios u ON p.usuario_id = u.id WHERE u.id = $1;'
    const { rowCount, rows } = await pool.query(consulta, values)
    if (!rowCount) {
        throw { code: 204, message: 'No existen productos' }
    } else {
        return rows
    }
}

// Funcion para obtener datos de  usuario
const obtenerUsuario = async (email) => {
    const value = [email]
    console.log(value)
    const consulta = 'SELECT * FROM Usuarios WHERE email = $1;'
    const { rows } = await pool.query(consulta, value)
    return rows 
}

module.exports = { obtenerProductos, verificarUsuario, registrarUsuario, publicarProducto, contactoUsuario, productosPublicado, obtenerUsuario }