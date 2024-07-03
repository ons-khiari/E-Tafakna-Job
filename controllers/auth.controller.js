const logger = require("../logger/Logger");
const authRepository = require("../repositories/auth.repository");

class AuthController {
  async registerCondidate(req, res) {
    try {
      logger.info("Controller: register condidate");
      const response = await authRepository.registerCondidate(req.body);
      return res.status(201).json(response);
    } catch (e) {
      logger.error("Error registering condidate", e);
      res
        .status(500)
        .json({ message: "Error registering condidate", error: e });
    }
  }

  async registerEmployer(req, res) {
    try {
      logger.info("Controller: register employer");
      const response = await authRepository.registerEmployer(req.body);
      return res.status(201).json(response);
    } catch (e) {
      logger.error("Error registering employer", e);
      res.status(500).json({ message: "Error registering employer", error: e });
    }
  }

  async registerAdmin(req, res) {
    try {
      logger.info("Controller: registerAdmin");
      const response = await authRepository.registerAdmin(req.body);
      return res.status(201).json(response);
    } catch (e) {
      logger.error("Error registering admin", e);
      res.status(500).json({ message: "Error registering admin", error: e });
    }
  }

  async login(req, res) {
    try {
      logger.info("Controller: login");
      const response = await authRepository.login(req.body);
      return res.status(200).json(response);
    } catch (e) {
      logger.error("Error logging in user", e);
      res.status(500).json({ message: "Error logging in user", error: e });
    }
  }

  async getAllUsers(req, res) {
    try {
      logger.info("Controller: getAllUsers");
      const response = await authRepository.getAllUsers();
      return res.status(200).json(response);
    } catch (e) {
      logger.error("Error getting all users", e);
      res.status(500).json({ message: "Error getting all users", error: e });
    }
  }
}

module.exports = new AuthController();
