const express = require("express");
const router_reservations = express.Router();
const userController = require("../controllers/user.js");

router_reservations.post("/",userController.createReservation);

router_reservations.get("/",userController.getReservations);

router_reservations.get("/myBookings",userController.getReservationsByUser);

module.exports = router_reservations;
