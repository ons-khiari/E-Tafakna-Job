const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/auth.middleware");

router.post("/register-condidate", authController.registerCondidate);
router.post("/register-employer", authController.registerEmployer);
router.post(
  "/register-admin",
  // authMiddleware,
  // adminMiddleware,
  authController.registerAdmin
);
router.post("/login", authController.login);
router.get(
  "/users",
  // adminMiddleware,
  // authMiddleware,
  authController.getAllUsers
);

module.exports = router;
