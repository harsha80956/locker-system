const express = require("express");
const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", [verifyToken, isAdmin], userController.getAllUsers);
router.get("/user/me", verifyToken, userController.getLoggedInUser);

module.exports = router;
