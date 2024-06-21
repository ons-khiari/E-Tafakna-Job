const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware, jobController.create);
router.get("/getAll", jobController.getAll);
router.get("/getAllByStatusTrue", jobController.getAllByStatusTrue);
router.get("/getAllByStatusFalse", jobController.getAllByStatusFalse);
router.get("/getAllMyJobs", authMiddleware, jobController.getAllMyJobs);
router.get("/getById/:id", jobController.getById);
router.get("/getAllByProfile/:profile", jobController.getAllByProfile);
router.patch("/update/:id", authMiddleware, jobController.update);

module.exports = router;
