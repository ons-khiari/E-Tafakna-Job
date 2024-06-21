const logger = require("../logger/Logger");
const categoryProjectRepository = require("../repositories/categoryProject.repository");

class CategoryProjectController {
  async create(req, res) {
    try {
      logger.info("Controller: createCategoryProject");
      const categoryProject = await categoryProjectRepository.create(req.body);
      res.status(201).json(categoryProject);
    } catch (error) {
      logger.error(error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      logger.info("Controller: getAllCategoryProjects");
      const categoryProjects = await categoryProjectRepository.getAll();
      res.status(200).json(categoryProjects);
    } catch (error) {
      logger.error(error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      logger.info("Controller: getCategoryProjectById");
      const { id } = req.params;
      const categoryProject = await categoryProjectRepository.getById(id);
      res.status(200).json(categoryProject);
    } catch (error) {
      logger.error(error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      logger.info("Controller: updateCategoryProject");
      const { id } = req.params;
      const categoryProject = await categoryProjectRepository.update(
        id,
        req.body
      );
      res.status(200).json(categoryProject);
    } catch (error) {
      logger.error(error.message);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CategoryProjectController();
