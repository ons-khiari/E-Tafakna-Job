const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const prisma = require("../prisma/prismaClient");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const BearerToken = req.headers["authorization"];
  const token = BearerToken && BearerToken.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });
      if (user) {
        req.user = user;
        next();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

const adminMiddleware = asyncHandler(async (req, res, next) => {
  const BearerToken = req.headers["authorization"];
  const token = BearerToken && BearerToken.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });
  if (user && user.role === "ADMIN") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

module.exports = { authMiddleware, adminMiddleware };
