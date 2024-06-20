const logger = require("../logger/Logger");
const experienceRepository = require("../repositories/experience.repository");

class ExperienceController {
  async addExperience(req, res) {
    try {
      logger.info("Controller: addExperience");
      const experience = await experienceRepository.addExperience(
        req.body,
        req.user.id
      );
      res.json(experience);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getMyExperiences(req, res) {
    try {
      logger.info("Controller: getMyExperiences");
      const experiences = await experienceRepository.getMyExperiences(
        req.user.id
      );
      res.json(experiences);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getExperienceOfProfile(req, res) {
    try {
      logger.info("Controller: getExperienceOfProfile");
      const experience = await experienceRepository.getExperienceOfProfile(
        req.params.id
      );
      res.json(experience);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteMyExperience(req, res) {
    try {
      logger.info("Controller: deleteMyExperience");
      await experienceRepository.deleteMyExperience(req.params.id);
      res.json({ message: "Experience deleted" });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateMyExperience(req, res) {
    try {
      logger.info("Controller: updateMyExperience");
      await experienceRepository.updateMyExperience(
        req.params.id,
        req.body,
        req.user.id
      );
      res.json({ message: "Experience updated" });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new ExperienceController();
