const express = require('express')
const cors = require('cors')
const { obtenerProductos, verificarUsuario, registrarUsuario } = require('./consultas')

const app = express()
app.use(cors())
app.use(express.json())

app.listen(3000, console.log('Servidor activo'))

// Get para obtener todos los productos de la base de datos
app.get('/', async (req, res)=> {
    try {
        const productos = await obtenerProductos()
        res.json(productos)
    } catch (error) {
        res.status(204).send('Productos no encontrados')
    }
})

// Post para login usuario
app.post('/login', async (req, res)=>{
    try {
        const { email, contraseña } = req.body
        const token = await verificarUsuario(email, contraseña)
        res.status(200).json({ message: 'Usuario encontrado', token})
    } catch (error) {
        res.status(401).json({ message: 'Usuario no encontrado'})
    }
})

// Post para registrar usuario
app.post('/registrarse', async (req, res) => {
    try {
        const usuario = req.body
        await registrarUsuario(usuario)
        res.send('usuario creado con exito')
    } catch (error) {
        res.status(401).json({ message: 'Usuario no registrado'})
    }
})
