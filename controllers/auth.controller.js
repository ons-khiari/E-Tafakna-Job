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
      const { email, password } = req.body;
      const response = await authRepository.login({ email, password });
  
      if (response === "email invalid") {
        return res.status(400).json({ message: "Invalid email" });
      } else if (response === "wrong password") {
        return res.status(400).json({ message: "Wrong password" });
      } else if (response.token && response.refreshToken) {
        return res.status(200).json(response);
      } else {
        return res.status(500).json({ message: "Unexpected error" });
      }
    } catch (e) {
      logger.error("Error logging in user \n" + e.message);
      res.status(500).json({ message: "Error logging in user", error: e.message });
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

  async deleteUser(req, res) {
    try {
      logger.info("Controller: deleteUser");
      const response = await authRepository.deleteUser(req.params.id);
      return res.status(200).json(response);
    } catch (e) {
      logger.error("Error deleting user", e);
      res.status(500).json({ message: "Error deleting user", error: e });
    }
  }
}

module.exports = new AuthController();
