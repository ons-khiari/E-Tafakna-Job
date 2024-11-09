const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/auth.middleware");
const { verifyRefreshToken, verifyToken } = require("../helpers/auth.helper");

router.post("/register-condidate", authController.registerCondidate);
router.post("/register-employer", authController.registerEmployer);
router.post(
  "/register-admin",
  authMiddleware,
  adminMiddleware,
  authController.registerAdmin
);
router.post("/login", authController.login);
router.get(
  "/users",
  // adminMiddleware,
  // authMiddleware,
  authController.getAllUsers
);

router.post("/verify-token", (req, res) => {
  const { token } = req.body;
  if (!token || typeof token !== "string") {
    return res.status(400).json({ message: "Refresh token must be a string" });
  }
  try {
    const decoded = verifyToken(token);
    return res.status(200).json({ message: "Token is valid", decoded });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token", error: err.message });
  }
});

router.post("/verify-refresh-token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || typeof refreshToken !== "string") {
    return res.status(400).json({ message: "Refresh token must be a string" });
  }
  try {
    const decoded = verifyRefreshToken(refreshToken);
    return res.status(200).json({ message: "Refresh Token is valid", decoded });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid refresh token", error: err.message });
  }
});

router.delete("/delete/:id", authController.deleteUser);
router.get("/user/:id", authController.getUserById);
router.patch("/update/:id", authController.updateUser);

module.exports = router;
