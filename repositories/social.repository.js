const logger = require("../logger/Logger");
const prisma = require("../prisma/prismaClient");

class SocialRepository {
  async addSocial(social, userId) {
    try {
      logger.info("Repository: addSocial");
      const userProfile = await prisma.profile.findUnique({
        where: {
          userId: userId,
        },
      });
      if (!userProfile) {
        throw new Error("User profile not found");
      }
      const newSocial = await prisma.social.create({
        data: {
          name: social.name,
          url: social.url,
          profileId: userProfile.id,
        },
      });
      return newSocial;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async getAllMySocials(userId) {
    try {
      logger.info("Repository: getAllMySocials");
      const socials = await prisma.social.findMany({
        where: {
          profile: {
            userId: userId,
          },
        },
      });
      return socials;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async deleteSocial(id) {
    try {
      logger.info("Repository: deleteSocial");
      const socialId = parseInt(id);
      await prisma.social.delete({
        where: {
          id: socialId,
        },
      });
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async updateSocial(social, id) {
    try {
      logger.info("Repository: updateSocial");
      const socialId = parseInt(id);
      const updatedSocial = await prisma.social.update({
        where: {
          id: socialId,
        },
        data: {
          name: social.name,
          url: social.url,
        },
      });
      return updatedSocial;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async getSocialsOfProfile(profileId) {
    try {
      logger.info("Repository: getSocialsOfProfile");
      const socials = await prisma.social.findMany({
        where: {
          profileId: parseInt(profileId),
        },
      });
      return socials;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = new SocialRepository();
