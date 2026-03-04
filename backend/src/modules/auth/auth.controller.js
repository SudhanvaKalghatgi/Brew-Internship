import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import sendToken from "../../utils/sendToken.js";
import { getCookieOptions } from "../../utils/cookieOptions.js";
import env from "../../config/env.js";

import {
  registerUser,
  loginUser,
  generateResetToken,
  resetPassword,
} from "./auth.service.js";

import { sendResetPasswordEmail } from "../../services/mail.service.js";

// ==============================
// Register
// ==============================
export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  return sendToken(user, res, "User registered successfully");
});

// ==============================
// Login
// ==============================
export const login = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body);
  return sendToken(user, res, "Login successful");
});

// ==============================
// Logout
// ==============================
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", getCookieOptions(0));

  return res
    .status(200)
    .json(new ApiResponse(200, "Logged out successfully"));
});

// ==============================
// Forgot Password
// ==============================
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log("forgotPassword called for:", email);

  // generateResetToken should:
  // - find user
  // - generate plain token
  // - hash and store in DB
  // - set expiry
  // - return plain token OR null
  const resetToken = await generateResetToken(email);
  console.log("resetToken generated:", !!resetToken);

  if (resetToken) {
    const clientOrigin = req.headers.origin || env.frontendUrl;
    const resetUrl = `${clientOrigin}/reset-password/${resetToken}`;
    console.log("Sending email to:", email, "with URL:", resetUrl);

    try {
      await sendResetPasswordEmail(email, resetUrl);
      console.log("Email sent successfully");
    } catch (e) {
      console.error("Error in sendResetPasswordEmail:", e);
      throw e;
    }
  }

  // Always respond same way (no email leakage)
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "If the email is registered, a reset link has been sent."
      )
    );
});

// ==============================
// Reset Password
// ==============================
export const handleResetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await resetPassword(token, password);

  return sendToken(user, res, "Password reset successful");
});