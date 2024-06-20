const Logger = require("../logger/Logger");
const prisma = require("../prisma/prismaClient");

class EducationRepository {
  async addEducation(education, userId) {
    try {
      Logger.info("Repository: addEducation");
      const userProfile = await prisma.profile.findUnique({
        where: {
          userId: userId,
        },
      });
      if (!userProfile) {
        throw new Error("User profile not found");
      }
      const newEducation = await prisma.education.create({
        data: {
          school: education.school,
          degree: education.degree,
          fieldOfStudy: education.fieldOfStudy,
          startYear: education.startYear,
          endYear: education.endYear,
          profileId: userProfile.id,
        },
      });
      return newEducation;
    } catch (error) {
      Logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async getAllMyEducation(userId) {
    try {
      Logger.info("Repository: getAllMyEducation");
      const educations = await prisma.education.findMany({
        where: {
          profile: {
            userId: userId,
          },
        },
      });
      return educations;
    } catch (error) {
      Logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async deleteEducation(idd) {
    try {
      Logger.info("Repository: deleteEducation");
      const educationId = parseInt(idd);
      await prisma.education.delete({
        where: {
          id: educationId,
        },
      });
    } catch (error) {
      Logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async updateEducation(education, idd) {
    try {
      Logger.info("Repository: updateEducation");
      const educationId = parseInt(idd);
      const updatedEducation = await prisma.education.update({
        where: {
          id: educationId,
        },
        data: {
          school: education.school,
          degree: education.degree,
          fieldOfStudy: education.fieldOfStudy,
          startYear: education.startYear,
          endYear: education.endYear,
        },
      });
      return updatedEducation;
    } catch (error) {
      Logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }

  async getEducationOfProfile(id) {
    try {
      Logger.info("Repository: getEducationOfProfile");
      const profileId = parseInt(id);
      const educations = await prisma.education.findMany({
        where: {
          profileId: profileId,
        },
      });
      return educations;
    } catch (error) {
      Logger.error(error.message);
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = new EducationRepository();
