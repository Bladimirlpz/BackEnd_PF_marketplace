const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "./.env" });

const routes = require("./routes/index");

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use(routes);

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});

module.exports = app;
