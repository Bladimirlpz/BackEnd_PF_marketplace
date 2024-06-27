const request = require("supertest");
const app = require("../index");

describe("Operaciones marketplace", () => {
  it("Obtener Productos", async () => {
    const { statusCode } = await request(app).get("/").send();
    expect(statusCode).toBe(201);
  });

  it("Contacto", async () => {
    const element = {
      nombre: "Juan",
      email: "juan@gmail.com",
      mensaje: "Lorem ipsum",
    };
    const response = await request(app)
      .post("/contacto")
      .send(element);
    expect(response.statusCode).toBe(200);
  });


  it("Registro de usuario con exito", async () => {
    const newUser = {
      nombre: "nombre",
      apellido: "apellido",
      email: "nuevo1@usuario.com",
      contraseña: "1234"
    };
    const response = await request(app).post("/registrarse").send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Usuario registrado con exito");
  });

  it("Intento de registro con email ya registrado", async () => {
    const newUser = {
      email: "juan@example.com",
      contraseña: "1234"
    };
    const response = await request(app).post("/registrarse").send(newUser);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Email ya registrado");
  });

  it("Login con credenciales incorrectas", async () => {
    const loginData = {
      email: "juan@example.com",
      contraseña: "wrongpassword"
    };
    const response = await request(app).post("/login").send(loginData);
    expect(response.statusCode).toBe(401);
  });

  it("Añadir al carrito", async () => {
    const element = { 
      usuario_id: 99, 
      carrito_id: 2,
      cantidad: 12,
      id:9 };
    const response = await request(app)
      .post("/carrito")
      .send(element);

    expect(response.statusCode).toBe(201);
  });

});