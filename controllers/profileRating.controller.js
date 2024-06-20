const logger = require("../logger/Logger");
const profileRatingRepository = require("../repositories/profileRating.repository");

class ProfileRatingController {
  async addRating(req, res) {
    try {
      logger.info("Controller: addRating");
      const rating = await profileRatingRepository.addRating(
        req.body,
        req.params.id,
        req.user.id
      );
      res.json(rating);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getMyRatings(req, res) {
    try {
      logger.info("Controller: getMyRatings");
      const ratings = await profileRatingRepository.getMyRatings(req.user.id);
      res.json(ratings);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getRatingsOfProfile(req, res) {
    try {
      logger.info("Controller: getRatingsOfProfile");
      const ratings = await profileRatingRepository.getRatingsOfProfile(
        req.params.id
      );
      res.json(ratings);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getGivenRatings(req, res) {
    try {
      logger.info("Controller: getGivenRatings");
      const ratings = await profileRatingRepository.getGivenRatings(req.user.id);
      res.json(ratings);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

}

module.exports = new ProfileRatingController();
