const express = require("express");
const router = express.Router();
const lockersController = require("../controllers/lockersController");
const authenticateToken = require("../middleware/authenticateToken");

// Create a new locker
router.post("/", authenticateToken, lockersController.createLocker);

// Read all lockers
router.get("/", lockersController.getAllLockers);

// Update a locker by ID
router.patch("/:id", authenticateToken, lockersController.updateLocker);

// Delete a locker by ID
router.delete("/:id", authenticateToken, lockersController.deleteLocker);

module.exports = router;
