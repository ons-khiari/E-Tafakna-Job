const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.get("/me", authMiddleware, profileController.getMyProfile);
router.get("/:id", profileController.getProfileById);
router.patch("/update", authMiddleware, profileController.updateProfile);

module.exports = router;
