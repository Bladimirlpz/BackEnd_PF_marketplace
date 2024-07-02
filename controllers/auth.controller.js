const { getUserByEmail, createUser } = require("../models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  const { contrasena, email } = req.body;
  try {
    const user = await getUserByEmail(email);
    const { contrasena: contraseñaEncriptada } = user[0];
    const contraseñaCorrecta = bcrypt.compareSync(
      contrasena,
      contraseñaEncriptada
    );
    if (!contraseñaCorrecta) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      {
        email: user[0].email,
        nombre: user[0].nombre,
        apellido: user[0].apellido,
        id: user[0].id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Usuario encontrado", token });
  } catch (error) {
    res.status(401).json({ message: "Usuario no encontrado" });
  }
};

const registerUser = async (req, res) => {
  try {
    const user = req.body;
    console.log(req.body);
    await createUser(user);
    res.status(201).json({ message: "Usuario registrado con exito" });
  } catch (error) {
    res.status(401).json({ message: "Email ya registrado" });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
