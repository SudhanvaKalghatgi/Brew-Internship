// src/utils/jwt.js
import jwt from "jsonwebtoken";
import env from "../config/env.js";

/**
 * Generate JWT Access Token
 * @param {String} userId
 * @returns {String} token
 */
export const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    }
  );
};