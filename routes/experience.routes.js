const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experience.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/add", authMiddleware, experienceController.addExperience);
router.get("/my", authMiddleware, experienceController.getMyExperiences);
router.get("/profile/:id", experienceController.getExperienceOfProfile);
router.delete(
  "/delete/:id",
  authMiddleware,
  experienceController.deleteMyExperience
);
router.patch(
  "/update/:id",
  authMiddleware,
  experienceController.updateMyExperience
);

module.exports = router;
