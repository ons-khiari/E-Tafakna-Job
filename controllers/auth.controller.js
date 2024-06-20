const logger = require("../logger/Logger");
const authRepository = require("../repositories/auth.repository");

class AuthController {
  async register(req, res) {
    try {
      logger.info("Controller: register");
      const response = await authRepository.register(req.body);
      return res.status(201).json(response);
    } catch (e) {
      logger.error("Error registering user", e);
      res.status(500).json({ message: "Error registering user", error: e });
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
