const request = require("supertest");
const app = require("../index");

describe("Operaciones marketplace", () => {

  it("Obtener Productos", async () => {
    const { statusCode } = await request(app).get("/").send();
    expect(statusCode).toBe(200);
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
  


});
