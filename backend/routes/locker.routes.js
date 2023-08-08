const express = require("express");
const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const lockerController = require("../controllers/locker.controller");

const router = express.Router();

router.post("/add", [verifyToken, isAdmin], lockerController.createLocker);
router.get("/", [verifyToken], lockerController.getAllLockers);
router.put("/:id", [verifyToken, isAdmin], lockerController.updateLocker);

module.exports = router;
