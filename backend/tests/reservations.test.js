const request = require("supertest");
const app = require("../main.js");

describe("Reservations route", () => {
    test("Refuse de réserver sans être connecté", async () => {
        const res = await request(app)
        .post("/reservations")
        .send({ booking_name: "Réservation", booking_time: "2025-09-21T14:00:00Z" });

        expect(res.statusCode).toBe(302); 
    });
});
