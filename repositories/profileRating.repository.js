const logger = require("../logger/Logger");
const prisma = require("../prisma/prismaClient");

class ProfileRatingRepository {
  async addRating(rating, id, userId) {
    try {
      logger.info("Repository: addRating");
      const profileId = parseInt(id);
      if (rating.rating < 1 || rating.rating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }
      const userProfile = await prisma.profile.findUnique({
        where: {
          userId: userId,
        },
      });
      if (!userProfile) {
        throw new Error("User profile not found");
      }
      if (userProfile.id === profileId) {
        throw new Error("You cannot rate your own profile");
      }
      const existingRating = await prisma.profileRatings.findFirst({
        where: {
          profileId: profileId,
          raterProfileId: userProfile.id,
        },
      });
      if (existingRating) {
        throw new Error("You have already rated this profile");
      }
      const newRating = await prisma.profileRatings.create({
        data: {
          rating: rating.rating,
          comment: rating.comment,
          profileId: profileId,
          raterProfileId: userProfile.id
        },
      });
      return newRating;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async getMyRatings(userId) {
    try {
      logger.info("Repository: getMyRatings");
      const ratings = await prisma.profileRatings.findMany({
        where: {
          profile: {
            userId: userId,
          },
        },
      });
      return ratings;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async getRatingsOfProfile(profileId) {
    try {
      logger.info("Repository: getRatingsOfProfile");
      const ratings = await prisma.profileRatings.findMany({
        where: {
          profileId: parseInt(profileId),
        },
      });
      return ratings;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async getGivenRatings(userId) {
    try {
      logger.info("Repository: getGivenRatings");
      const ratings = await prisma.profileRatings.findMany({
        where: {
          raterProfile: {
            userId: userId,
          },
        },
      });
      return ratings;
    } catch (error) {
      logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = new ProfileRatingRepository();
