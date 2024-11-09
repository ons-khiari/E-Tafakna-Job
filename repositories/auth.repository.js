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
          avatar:
            "https://storage.googleapis.com/e-tafakna-job.appspot.com/profile-picture-avatar-icon.jpg?GoogleAccessId=firebase-adminsdk-pvq2c%40e-tafakna-job.iam.gserviceaccount.com&Expires=16447014000&Signature=RcjYUCjwy7k2KpqSS3v3A6eEHwj3Z9I0im%2BiRZ8e2Cm96vxpSH%2B7Zs5mH%2F873PJf8ANhuRanzhgJiN7m82zw69%2BMCQ6DfRjXUsRv6O7R5%2FIjychnqAPaXSNx8%2Bok1MFT8K69qPB1%2BYKdYHUqB0UVg1yJJcqk%2F2cC9sEESfeSPiLRWSu817gEvY%2FzHuF7w1rHWmcOzCvGc6hc7DmJd11%2FOR9FwgfXTM7li%2FdjJChbjtM5TX38nt%2BanDYzFXntI1CAKtYjSkcn6iMCiavqIw81LCOgfPkRn7NfXZz%2BXecTJOi%2FN%2FmNrsDdkrrRhkCa4CNpILF3OsKR882lXVGa2Pz4UQ%3D%3D",
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
      return users;
    } catch (e) {
      logger.error("Error getting all users \n" + e.message);
      return e;
    }
  }

  async deleteUser(id) {
    try {
      logger.info("Repository: deleteUser");
      await prisma.profile.deleteMany({
        where: {
          userId: parseInt(id),
        },
      });
      const user = await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });

      return user;
    } catch (e) {
      logger.error("Error deleting user \n" + e.message);
      return e;
    }
  }

  async getUserById(id) {
    try {
      logger.info("Repository: getUserById");
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      return user;
    } catch (e) {
      logger.error("Error getting user by id \n" + e.message);
      return e;
    }
  }
}

module.exports = new AuthRepository();
