const logger = require("../logger/Logger");
const prisma = require("../prisma/prismaClient");

class SkillsRepository {
  async getMySkills(userId) {
    try {
      logger.info("Repository: getMySkills");
      // Find the profile ID associated with the userId
      const profile = await prisma.profile.findUnique({
        where: {
          userId: userId,
        },
      });
      if (!profile) {
        throw new Error("Profile not found");
      }
      // Get all skills for the profile
      const skills = await prisma.skills.findMany({
        where: {
          profileId: profile.id,
        },
      });
      return skills;
    } catch (error) {
      logger.error("Error getting skills \n" + error.message);
      throw error;
    }
  }

  async getSkillsOfProfile(profileId) {
    try {
      logger.info("Repository: getSkillsOfProfile");
      const skills = await prisma.skills.findMany({
        where: {
          profileId: parseInt(profileId),
        },
      });
      return skills;
    } catch (error) {
      logger.error("Error getting skills \n" + error.message);
      throw error;
    }
  }
}

module.exports = new SkillsRepository();
