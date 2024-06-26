const express = require("express");
const { loginUser, registerUser } = require("../controllers/auth.controller");
const { getProducts, postProduct, getProductsByUser } = require("../controllers/product.controller");
const { getUser } = require("../controllers/user.controller");
const { postContact } = require("../controllers/contact.controller");
const { postCart } = require("../controllers/cart.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

// Rutas de autenticación
router.post("/login", loginUser);
router.post("/registrarse", registerUser);

// Rutas de productos
router.get("/productos", getProducts);
router.post("/publicar", authMiddleware, postProduct);
router.get("/mis-publicaciones", authMiddleware, getProductsByUser);

// Rutas de usuario
router.get("/usuario", authMiddleware, getUser);

// Rutas de contacto
router.post("/contacto", postContact);

// Rutas de carrito
router.post("/carrito", authMiddleware, postCart);

module.exports = router;