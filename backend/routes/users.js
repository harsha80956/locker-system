const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// User Registration
router.post("/register", usersController.registerUser);

// User Login
router.post("/login", usersController.loginUser);

module.exports = router;
