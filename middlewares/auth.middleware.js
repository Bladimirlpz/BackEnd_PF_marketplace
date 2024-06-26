<<<<<<< HEAD
require("dotenv").config({ path: "../.env" });
=======
require("dotenv").config({ path: "./middleware/.env" });
>>>>>>> origin/main
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
<<<<<<< HEAD
    res.status(401).json({ error: "No se encontró el token" });
    return;
=======
    res.status(401).json({ error: "No se encontro el token" });
>>>>>>> origin/main
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
<<<<<<< HEAD
    return res.status(401).send({ error: "Token inválido" });
  }
};

module.exports = { authMiddleware };
=======
    return res.status(401).send({ error: "Token invalido" });
  }
};

module.exports = { authMiddleware };
>>>>>>> origin/main
