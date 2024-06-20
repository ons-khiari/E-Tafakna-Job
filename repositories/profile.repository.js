const logger = require("../logger/Logger");
const prisma = require("../prisma/prismaClient");

class ProfileRepository {
  async getMyProfile(userId) {
    try {
      logger.info("Repository: getMyProfile");
      const profile = await prisma.profile.findUnique({
        where: {
          userId: userId,
        },
      });
      return profile;
    } catch (error) {
      logger.error("Error getting profile \n" + error.message);
      return error;
    }
  }

  async getProfileById(id) {
    try {
      logger.info("Repository: getProfileById");
      const profileId = parseInt(id);
      const profile = await prisma.profile.findUnique({
        where: {
          id: profileId,
        },
      });
      return profile;
    } catch (error) {
      logger.error("Error getting profile \n" + error.message);
      return error;
    }
  }

  async updateProfile(userId, data) {
    try {
      logger.info("Repository: updateProfile");
      const updatedProfile = await prisma.profile.update({
        where: {
          userId: userId,
        },
        data: {
          ...data,
        },
      });
      return updatedProfile;
    } catch (error) {
      logger.error("Error updating profile \n" + error.message);
      return error;
    }
  }
}

module.exports = new ProfileRepository();
