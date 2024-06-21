const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/add", authMiddleware, projectController.create);
router.get("/getAll", projectController.getAll);
router.get("/get/:id", projectController.getById);
router.patch("/update/:id", authMiddleware, projectController.update);
router.get(
  "/getAllMyProjects",
  authMiddleware,
  projectController.getAllMyProjects
);

module.exports = router;
