const express = require("express");
const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const dashboardController = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/", [verifyToken, isAdmin], dashboardController.getDashboardData);

module.exports = router;
