const logger = require("../logger/Logger");
const projectRepository = require("../repositories/project.repository");

class ProjectController {
  async create(req, res) {
    try {
      logger.info("Controller: createProject");
      const project = await projectRepository.create(req.body);
      res.status(201).json(project);
    } catch (error) {
      logger.error(error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async getAllMyProjects(req, res) {
    try {
      logger.info("Controller: getAllMyProjects");
      const projects = await projectRepository.getAllMyProjects(req.user.id);
      res.status(200).json(projects);
    } catch (error) {
      logger.error(error.message);
      res.status(400).json({ error: error.message });
    }
  }
  
  async getAll(req, res) {
    try {
      logger.info("Controller: getAllProjects");
      const projects = await projectRepository.getAll();
      res.status(200).json(projects);
    } catch (error) {
      logger.error(error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      logger.info("Controller: getProjectById");
      const { id } = req.params;
      const project = await projectRepository.getById(id);
      res.status(200).json(project);
    } catch (error) {
      logger.error(error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      logger.info("Controller: updateProject");
      const { id } = req.params;
      const project = await projectRepository.update(id, req.body);
      res.status(200).json(project);
    } catch (error) {
      logger.error(error.message);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProjectController();
