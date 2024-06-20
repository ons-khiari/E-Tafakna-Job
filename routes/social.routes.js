const express = require("express");
const router = express.Router();
const socialController = require("../controllers/social.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/add", authMiddleware, socialController.addSocial);
router.get("/all", authMiddleware, socialController.getAllMySocials);
router.delete("/delete/:id", authMiddleware, socialController.deleteSocial);
router.patch("/update/:id", authMiddleware, socialController.updateSocial);
router.get("/profile/:id", socialController.getSocialsOfProfile);

module.exports = router;
