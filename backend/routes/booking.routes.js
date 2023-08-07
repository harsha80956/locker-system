const express = require("express");
const { verifyToken } = require("../middlewares/authJwt");
const bookingController = require("../controllers/booking.controller");

const router = express.Router();

router.post("/", verifyToken, bookingController.createBooking);
router.get("/", verifyToken, bookingController.getAllBookings);

module.exports = router;
