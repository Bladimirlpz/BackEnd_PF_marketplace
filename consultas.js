const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './.env'})

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
    if (!rowCount){
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
        throw {code: 404, message:'No se encontro ningun usuario con estas credenciales'}
      }
      const token = jwt.sign({ email: usuario.email, nombre: usuario.nombre, apellido: usuario.apellido }, process.env.JWT_SECRET, { expiresIn: '10h' })
      return token
    }    

// Registrar usuario
const registrarUsuario = async (usuario) => {
    let { nombre, apellido, email, contraseña } = usuario
    const contraseñaEncriptada = bcrypt.hashSync(contraseña)
    contraseña = contraseñaEncriptada
    const values = [nombre, apellido, email, contraseñaEncriptada]
    const consulta = 'INSERT INTO Usuarios values (DEFAULT, $1, $2, $3, $4)'
    await pool.query(consulta, values)
}

module.exports = {obtenerProductos, verificarUsuario, registrarUsuario}