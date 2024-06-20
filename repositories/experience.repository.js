const { deleteMyExperience } = require("../controllers/experience.controller");
const logger = require("../logger/Logger");
const prisma = require("../prisma/prismaClient");

class ExperienceRepository {
  async addExperience(experience, userId) {
    try {
      logger.info("Repository: addExperience");
      const userProfile = await prisma.profile.findUnique({
        where: {
          userId: userId,
        },
      });
      if (!userProfile) {
        throw new Error("User profile not found");
      }
      const newExperience = await prisma.experience.create({
        data: {
          title: experience.title,
          company: experience.company,
          location: experience.location,
          startDate: experience.startDate,
          endDate: experience.endDate,
          description: experience.description,
          profileId: userProfile.id,
        },
      });
      return newExperience;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async getMyExperiences(userId) {
    try {
      logger.info("Repository: getMyExperiences");
      const userProfile = await prisma.profile.findUnique({
        where: {
          userId: userId,
        },
      });
      if (!userProfile) {
        throw new Error("User profile not found");
      }
      const experiences = await prisma.experience.findMany({
        where: {
          profileId: userProfile.id,
        },
      });
      return experiences;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async getExperienceOfProfile(id) {
    try {
      logger.info("Repository: getExperienceOfProfile");
      const profileId = parseInt(id);
      const experiences = await prisma.experience.findMany({
        where: {
          profileId: profileId,
        },
      });
      return experiences;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async deleteMyExperience(id) {
    try {
      logger.info("Repository: deleteMyExperience");
      const experienceId = parseInt(id);
      await prisma.experience.delete({
        where: {
          id: experienceId,
        },
      });
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async updateMyExperience(id, experience, userId) {
    try {
      logger.info("Repository: updateMyExperience");
      const experienceId = parseInt(id);
      const userProfile = await prisma.profile.findUnique({
        where: {
          userId: userId,
        },
      });
      if (!userProfile) {
        throw new Error("User profile not found");
      }
      const existingExperience = await prisma.experience.findUnique({
        where: {
          id: experienceId,
        },
      });
      if (!existingExperience) {
        throw new Error(`Experience with id ${experienceId} not found`);
      }
      await prisma.experience.update({
        where: {
          id: experienceId,
        },
        data: {
          title: experience.title,
          company: experience.company,
          location: experience.location,
          startDate: experience.startDate,
          endDate: experience.endDate,
          description: experience.description,
        },
      });
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = new ExperienceRepository();
