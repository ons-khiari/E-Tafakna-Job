const logger = require("../logger/Logger");
const socialRepository = require("../repositories/social.repository");

class SocialController {
  async addSocial(req, res) {
    try {
      logger.info("Controller: addSocial");
      const newSocial = await socialRepository.addSocial(req.body, req.user.id);
      res.status(201).json(newSocial);
    } catch (error) {
      logger.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }

  async getAllMySocials(req, res) {
    try {
      logger.info("Controller: getAllMySocials");
      const socials = await socialRepository.getAllMySocials(req.user.id);
      res.status(200).json(socials);
    } catch (error) {
      logger.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteSocial(req, res) {
    try {
      logger.info("Controller: deleteSocial");
      await socialRepository.deleteSocial(req.params.id);
      res.status(204).end();
    } catch (error) {
      logger.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateSocial(req, res) {
    try {
      logger.info("Controller: updateSocial");
      const updatedSocial = await socialRepository.updateSocial(
        req.body,
        req.params.id
      );
      res.status(200).json(updatedSocial);
    } catch (error) {
      logger.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }

  async getSocialsOfProfile(req, res) {
    try {
      logger.info("Controller: getSocialsOfProfile");
      const socials = await socialRepository.getSocialsOfProfile(req.params.id);
      res.status(200).json(socials);
    } catch (error) {
      logger.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new SocialController();
