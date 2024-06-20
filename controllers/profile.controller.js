const logger = require("../logger/Logger");
const profileRepository = require("../repositories/profile.repository");

class ProfileController {
  async getMyProfile(req, res) {
    try {
      logger.info("Controller: getMyProfile");
      const profile = await profileRepository.getMyProfile(req.user.id);
      res.json(profile);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getProfileById(req, res) {
    try {
      logger.info("Controller: getProfileById");
      const profile = await profileRepository.getProfileById(req.params.id);
      res.json(profile);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateProfile(req, res) {
    try {
      logger.info("Controller: updateProfile");
      const updatedProfile = await profileRepository.updateProfile(
        req.user.id,
        req.body
      );
      res.json(updatedProfile);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new ProfileController();
