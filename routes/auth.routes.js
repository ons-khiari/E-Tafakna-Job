const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/users",
  adminMiddleware,
  authMiddleware,
  authController.getAllUsers
);

module.exports = router;
