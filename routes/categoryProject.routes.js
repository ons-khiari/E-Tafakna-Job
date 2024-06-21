const express = require("express");
const router = express.Router();
const categoryProjectController = require("../controllers/categoryProject.controller");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/auth.middleware");

router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  categoryProjectController.create
);
router.get("/getAll", categoryProjectController.getAll);
router.get("/get/:id", categoryProjectController.getById);
router.patch(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  categoryProjectController.update
);

module.exports = router;
