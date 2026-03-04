// src/utils/sendToken.js
import { generateAccessToken } from "./jwt.js";
import { getCookieOptions } from "./cookieOptions.js";
import ApiResponse from "./ApiResponse.js";
import env from "../config/env.js";

const sendToken = (user, res, message = "Success") => {
  const token = generateAccessToken(user._id);

  // Convert JWT expiry (like "15m") to milliseconds
  const expiryMinutes = parseInt(env.jwtExpiresIn);
  const maxAge = expiryMinutes * 60 * 1000;

  res.cookie("accessToken", token, getCookieOptions(maxAge));

  let userData = user;
  if (user.toObject) {
    userData = user.toObject();
  }
  if (userData.password) {
    delete userData.password;
  }

  return res
    .status(200)
    .json(new ApiResponse(200, message, { user: userData }));
};

export default sendToken;