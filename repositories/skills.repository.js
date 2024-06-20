const logger = require("../logger/Logger");
const prisma = require("../prisma/prismaClient");

class SkillsRepository {
  async addSkill(data, userId) {
    try {
      logger.info("Repository: addSkill");
      // Find the profile ID associated with the userId
      const profile = await prisma.profile.findUnique({
        where: {
          userId: userId,
        },
      });
      if (!profile) {
        throw new Error("Profile not found");
      }
      // Check if the skill already exists for the profile
      const existingSkill = await prisma.skills.findFirst({
        where: {
          profileId: profile.id,
          name: data.name,
        },
      });
      if (existingSkill) {
        throw new Error("Skill already exists for this profile");
      }
      // Create the skill
      const skill = await prisma.skills.create({
        data: {
          name: data.name,
          profile: {
            connect: {
              id: profile.id,
            },
          },
        },
      });
      return skill;
    } catch (error) {
      logger.error("Error adding skill \n" + error.message);
      throw error;
    }
  }

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

  async deleteMySkill(skillId, userId) {
    try {
      logger.info("Repository: deleteMySkill");
      // Find the profile ID associated with the userId
      const profile = await prisma.profile.findUnique({
        where: {
          userId: userId,
        },
      });
      if (!profile) {
        throw new Error("Profile not found");
      }
      // Find the skill
      const skill = await prisma.skills.findFirst({
        where: {
          id: parseInt(skillId),
          profileId: profile.id,
        },
      });
      if (!skill) {
        throw new Error("Skill not found");
      }
      // Delete the skill
      await prisma.skills.delete({
        where: {
          id: skill.id,
        },
      });
      return skill;
    } catch (error) {
      logger.error("Error deleting skill \n" + error.message);
      throw error;
    }
  }
}

module.exports = new SkillsRepository();
