const logger = require("../logger/Logger");
const prisma = require("../prisma/prismaClient");

class ProjectRepository {
  async create(data) {
    try {
      logger.info("Repository: createProject");
      const project = await prisma.project.create({ data });
      return project;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }

  async getAllMyProjects(userId) {
    try {
      logger.info("Repository: getAllMyProjects");
      const userProfile = await prisma.profile.findUnique({
        where: {
          userId: userId,
        },
      });
      if (!userProfile) {
        throw new Error("User profile not found");
      }
      const projects = await prisma.project.findMany({
        where: { postedById: userProfile.id },
      });
      return projects;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }

  async getAll() {
    try {
      logger.info("Repository: getAllProjects");
      const projects = await prisma.project.findMany();
      return projects;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }

  async getById(id) {
    try {
      logger.info("Repository: getProjectById");
      const project = await prisma.project.findUnique({ where: { id } });
      return project;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }

  async update(id, data) {
    try {
      logger.info("Repository: updateProject");
      const project = await prisma.project.update({ where: { id }, data });
      return project;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }
}

module.exports = new ProjectRepository();
