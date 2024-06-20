const express = require("express");
const router = express.Router();
const skillsController = require("../controllers/skills.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/add", authMiddleware, skillsController.addSkill);
router.get("/my-skills", authMiddleware, skillsController.getMySkills);
router.get("/profile/:id", skillsController.getSkillsOfProfile);
router.delete("/delete/:id", authMiddleware, skillsController.deleteMySkill);

module.exports = router;
