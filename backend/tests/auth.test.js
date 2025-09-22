const request = require("supertest");
const app = require("../main.js");



describe("Login route", () => {
    test("Login avec bon mot de passe", async () => {
        const res = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "Test@1234" });

        expect(res.statusCode).toBe(302); 
    });

    test("Login échoue avec mauvais mot de passe", async () => {
        const res = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "WrongPassword" });

        expect(res.statusCode).toBe(403);
    });
});
  