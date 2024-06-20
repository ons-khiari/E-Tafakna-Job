const express = require("express");
const router = express.Router();
const educationController = require("../controllers/education.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/add", authMiddleware, educationController.addEducation);
router.get("/all", authMiddleware, educationController.getAllMyEducation);
router.delete("/delete/:id", authMiddleware, educationController.deleteEducation);
router.patch("/update/:id", authMiddleware, educationController.updateEducation);
router.get("/profile/:id", educationController.getEducationOfProfile);

module.exports = router;
