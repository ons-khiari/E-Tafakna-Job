const logger = require("../logger/Logger");
const educationRepository = require("../repositories/education.repository");

class EducationController {
  async addEducation(req, res) {
    try {
      logger.info("Controller: addEducation");
      const newEducation = await educationRepository.addEducation(
        req.body,
        req.user.id
      );
      res.json(newEducation);
    } catch (error) {
      logger.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }

  async getAllMyEducation(req, res) {
    try {
      logger.info("Controller: getAllMyEducation");
      const educations = await educationRepository.getAllMyEducation(
        req.user.id
      );
      res.json(educations);
    } catch (error) {
      logger.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteEducation(req, res) {
    try {
      logger.info("Controller: deleteEducation");
      await educationRepository.deleteEducation(req.params.id);
      res.json("Education deleted successfully");
    } catch (error) {
      logger.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateEducation(req, res) {
    try {
      logger.info("Controller: updateEducation");
      const updatedEducation = await educationRepository.updateEducation(
        req.body,
        req.params.id
      );
      res.json(updatedEducation);
    } catch (error) {
      logger.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }

  async getEducationOfProfile(req, res) {
    try {
      logger.info("Controller: getEducationOfProfile");
      const educations = await educationRepository.getEducationOfProfile(
        req.params.id
      );
      res.json(educations);
    } catch (error) {
      logger.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new EducationController();
