// src/modules/auth/auth.routes.js
import express from "express";

import validate from "../../middlewares/validate.middleware.js";
import { authLimiter } from "../../middlewares/rateLimit.middleware.js";

import {
  register,
  login,
  logout,
  forgotPassword,
  handleResetPassword,
} from "./auth.controller.js";

import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./auth.schema.js";

const router = express.Router();

// ==============================
// Register
// ==============================
router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  register
);

// ==============================
// Login
// ==============================
router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  login
);

// ==============================
// Logout
// ==============================
router.post("/logout", logout);

// ==============================
// Forgot Password
// ==============================
router.post(
  "/forgot-password",
  authLimiter,
  validate(forgotPasswordSchema),
  forgotPassword
);

// ==============================
// Reset Password
// ==============================
router.post(
  "/reset-password/:token",
  authLimiter,
  validate(resetPasswordSchema),
  handleResetPassword
);

export default router;