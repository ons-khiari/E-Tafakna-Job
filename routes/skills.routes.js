const express = require("express");
const router = express.Router();
const skillsController = require("../controllers/skills.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.get("/my-skills", authMiddleware, skillsController.getMySkills);
router.get("/profile/:id", skillsController.getSkillsOfProfile);
router.get("/getAll", skillsController.getAllSkills);
router.post("/create", skillsController.createSkill);

module.exports = router;
