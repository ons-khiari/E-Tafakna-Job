const logger = require("../logger/Logger");
const prisma = require("../prisma/prismaClient");

class categoryProjectRepository {
  async create(data) {
    try {
      logger.info("Repository: createCategoryProject");
      const categoryProject = await prisma.categoryProject.create({ data });
      return categoryProject;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }

  async getAll() {
    try {
      logger.info("Repository: getAllCategoryProjects");
      const categoryProjects = await prisma.categoryProject.findMany();
      return categoryProjects;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }

  async getById(id) {
    try {
      logger.info("Repository: getCategoryProjectById");
      const categoryProject = await prisma.categoryProject.findUnique({
        where: { id },
      });
      return categoryProject;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }

  async update(id, data) {
    try {
      logger.info("Repository: updateCategoryProject");
      const categoryProject = await prisma.categoryProject.update({
        where: { id },
        data,
      });
      return categoryProject;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }
}

module.exports = new categoryProjectRepository();
