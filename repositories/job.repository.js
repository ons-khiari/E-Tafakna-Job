const logger = require("../logger/Logger");
const prisma = require("../prisma/prismaClient");

class JobRepository {
  async create(data, userId) {
    try {
      logger.info("Repository: create");
      const job = await prisma.job.create({
        data: {
          Company: data.Company, 
          title: data.title,
          description: data.description,
          budgetmin: data.budgetmin,
          budgetmax: data.budgetmax,
          location: data.location,
          jobType: data.jobType,
          experienceLevel: data.experienceLevel,
          postedById: userId,
          Qualifications: data.Qualifications
        }
      });
      return job;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Error while creating job");
    }
  }


  async getAll() {
    try {
      logger.info("Repository: getAll");
      const jobs = await prisma.job.findMany({
        include: {
          postedBy: true,
        },
      });
      return jobs;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Error while fetching jobs");
    }
  }

  async getAllByStatusTrue() {
    try {
      logger.info("Repository: getAllByStatusTrue");
      const jobs = await prisma.job.findMany({
        where: {
          status: true,
        },
        include: {
          postedBy: true,
        },
      });
      return jobs;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Error while fetching jobs");
    }
  }

  async getAllByStatusFalse() {
    try {
      logger.info("Repository: getAllByStatusFalse");
      const jobs = await prisma.job.findMany({
        where: {
          status: false,
        },
        include: {
          postedBy: true,
        },
      });
      return jobs;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Error while fetching jobs");
    }
  }

  async getAllMyJobs(userId) {
    try {
      logger.info("Repository: getAllMyJobs");
      const jobs = await prisma.job.findMany({
        where: {
          postedById: userId,
        },
        include: {
          postedBy: true,
        },
      });
      return jobs;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Error while fetching jobs");
    }
  }

  async getById(id) {
    try {
      logger.info("Repository: getById");
      const job = await prisma.job.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          postedBy: true,
        },
      });
      return job;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Error while fetching job");
    }
  }

  async getAllByProfile(profileId) {
    try {
      logger.info("Repository: getAllByProfile");
      const jobs = await prisma.job.findMany({
        where: {
          postedById: parseInt(profileId),
        },
        include: {
          postedBy: true,
        },
      });
      return jobs;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Error while fetching jobs");
    }
  }

  async update(id, data) {
    try {
      logger.info("Repository: update");
      const jobId = parseInt(id);
      const job = await prisma.job.update({
        where: {
          id: jobId,
        },
        data: {
          title: data.title,
          description: data.description,
          budgetmin: data.budgetmin,
          budgetmax: data.budgetmax,
          location: data.location,
          jobType: data.jobType,
          experienceLevel: data.experienceLevel,
          status: data.status,
        },
      });
      return job;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Error while updating job");
    }
  }
}

module.exports = new JobRepository();
