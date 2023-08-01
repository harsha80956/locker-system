const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookingsController");
const authenticateToken = require("../middleware/authenticateToken");

// Create a new booking
router.post("/", authenticateToken, bookingsController.createBooking);

// Read all bookings for a specific user
router.get("/", authenticateToken, bookingsController.getAllBookings);

// Delete a booking by ID
router.delete("/:id", authenticateToken, bookingsController.deleteBooking);

module.exports = router;
