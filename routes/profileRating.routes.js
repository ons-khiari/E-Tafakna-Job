const express = require("express");
const router = express.Router();
const profileRatingController = require("../controllers/profileRating.controller");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/auth.middleware");

router.post("/add/:id", authMiddleware, profileRatingController.addRating);
router.get("/my-ratings", authMiddleware, profileRatingController.getMyRatings);
router.get("/profile/:id", profileRatingController.getRatingsOfProfile);
router.get("/given-ratings", authMiddleware, profileRatingController.getGivenRatings);

module.exports = router;
