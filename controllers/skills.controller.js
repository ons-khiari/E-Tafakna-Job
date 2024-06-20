const logger = require("../logger/Logger");
const skillsRepository = require("../repositories/skills.repository");

class SkillsController {
  async addSkill(req, res) {
    try {
      logger.info("Controller: addSkill");
      const skill = await skillsRepository.addSkill(req.body, req.user.id);
      res.json(skill);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getMySkills(req, res) {
    try {
      logger.info("Controller: getMySkills");
      const skills = await skillsRepository.getMySkills(req.user.id);
      res.json(skills);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getSkillsOfProfile(req, res) {
    try {
      logger.info("Controller: getSkillsOfProfile");
      const skills = await skillsRepository.getSkillsOfProfile(req.params.id);
      res.json(skills);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteMySkill(req, res) {
    try {
      logger.info("Controller: deleteMySkill");
      const skill = await skillsRepository.deleteMySkill(req.params.id, req.user.id);
      res.json(skill);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new SkillsController();
