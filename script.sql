-- Creación de la base de datos
CREATE DATABASE PF_marketplace;

-- Selección de la base de datos para trabajar en ella
USE PF_marketplace;

-- Creación de la tabla Usuarios con nombre, apellido, email y contraseña
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);


-- Creación de la tabla Productos 
CREATE TABLE Productos (
    id SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio INT NOT NULL,
    stock INT NOT NULL,
    imagen VARCHAR(255),
    categoria VARCHAR(50),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);


-- Creación de la tabla Carrito
CREATE TABLE Carrito (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    total INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

-- Creación de la tabla Detalles del Carrito
CREATE TABLE DetallesCarrito (
    id SERIAL PRIMARY KEY,
    carrito_id INT NOT NULL,
    nombre_producto VARCHAR(100) NOT NULL,
    precio INT NOT NULL,
    imagen VARCHAR(255),
    cantidad INT NOT NULL,
    FOREIGN KEY (carrito_id) REFERENCES Carrito(id)
);

-- Creacion de la tabla para contactos
CREATE TABLE Contactos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL
);

INSERT INTO Productos (nombre_producto, descripcion, precio, stock, imagen, categoria, usuario_id)
VALUES ('Camiseta Manchester City', 'Camiseta oficial de equipo Femenino ', 49990, 5, 'https://images-americanas.b2w.io/produtos/6344281117/imagens/camisa-manchester-city-i-22-23-torcedor-puma-feminina/6344281150_1_large.jpg', 'Mujer','1');

INSERT INTO Productos (nombre_producto, descripcion, precio, stock, imagen, categoria)
VALUES ('Camiseta real madrid', 'Camiseta oficial de equipo ', 79990, 10, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b06a7566cc674776a26fae0000ff5df0_9366/Camiseta_Uniforme_Local_Real_de_Madrid_22-23_Blanco_HF0291_01_laydown.jpg', 'Hombre', '2');


INSERT INTO Productos (nombre_producto, descripcion, precio, stock, imagen, categoria, usuario_id)
VALUES ('Camiseta Manchester City', 'Camiseta oficial de equipo Masculino ', 55990, 5, 'https://sinergiastore.cl/wp-content/uploads/2024/05/Photoroom_006_20240517_000223-700x700.jpg.webp', 'Hombre', '2');

INSERT INTO Productos (nombre_producto, descripcion, precio, stock, imagen, categoria, usuario_id)
VALUES ('Camiseta real madrid', 'Camiseta oficial de equipo femenino ', 69990, 5, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/dcb96be8cede4af99aa27c167155720a_9366/Camiseta_local_Real_Madrid_24-25_Blanco_IT5182_HM1.jpg', 'Mujer', '2');

INSERT INTO Productos (nombre_producto, descripcion, precio, stock, imagen, categoria, usuario_id)
VALUES ('TV Samsung 85"', 'televisor Samsung 2024 de 85" UHD ', 599990, 5, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/16772097_1/w=1500,h=1500', 'Electro', '1');

INSERT INTO Usuarios (nombre, apellido, email, contrasena)
VALUES ('Juan', 'Pérez', 'juan@example.com', '1234');

ALTER TABLE Productos
ADD COLUMN usuario_id INT,
ADD FOREIGN KEY (usuario_id) REFERENCES Usuarios(id);


