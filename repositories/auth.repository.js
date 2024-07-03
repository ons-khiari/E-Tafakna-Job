const logger = require("../logger/Logger");
const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcrypt");
const {
  generateToken,
  generateRefreshToken,
} = require("../helpers/auth.helper");

class AuthRepository {
  async registerCondidate({ email, password }) {
    try {
      logger.info("Repository: register condidate");
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          role: "CONDIDATE",
        },
      });
      const profile = await this.createProfile(user, user.id);
      const token = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);
      return { token, refreshToken };
    } catch (e) {
      logger.error("Error registering condidate \n" + e.message);
      return e;
    }
  }

  async registerEmployer({ email, password }) {
    try {
      logger.info("Repository: register employer");
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          role: "EMPLOYER",
        },
      });
      const profile = await this.createProfile(user, user.id);
      const token = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);
      return { token, refreshToken };
    } catch (e) {
      logger.error("Error registering employer \n" + e.message);
      return e;
    }
  }

  async registerAdmin({ email, password }) {
    try {
      logger.info("Repository: register admin");
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          role: "ADMIN",
        },
      });
      const profile = await this.createProfile(user, user.id);
      const token = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);
      return { token, refreshToken };
    } catch (e) {
      logger.error("Error registering admin \n" + e.message);
      return e;
    }
  }

  async createProfile(user, userId) {
    try {
      logger.info("Repository: createProfile");
      const profile = await prisma.profile.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return profile;
    } catch (e) {
      logger.error("Error creating profile \n" + e.message);
      return e;
    }
  }

  async login({ email, password }) {
    try {
      logger.info("Repository: login");
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return "email invalid";
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        return { token, refreshToken };
      } else {
        return "wrong password";
      }
    } catch (e) {
      logger.error("Error logging in user \n" + e.message);
      return e;
    }
  }

  async getAllUsers() {
    console.log("hello");
    try {
      logger.info("Repository: getAllUsers");
      const users = await prisma.user.findMany();
      console.log(users);
      return users;
    } catch (e) {
      logger.error("Error getting all users \n" + e.message);
      return e;
    }
  }
}

module.exports = new AuthRepository();
