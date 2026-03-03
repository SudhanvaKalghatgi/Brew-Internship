import { z } from "zod";

// Strong password rule:
// - Minimum 8 characters
// - At least 1 letter
// - At least 1 number
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Za-z]/, "Password must contain at least one letter")
  .regex(/[0-9]/, "Password must contain at least one number");

// Name validation
const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must not exceed 50 characters")
  .trim();

// Email validation
const emailSchema = z
  .string()
  .email("Invalid email format")
  .trim()
  .toLowerCase();

// ==============================
// Register Schema
// ==============================
export const registerSchema = z.object({
  body: z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  }),
});

// ==============================
// Login Schema
// ==============================
export const loginSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required"),
  }),
});

// ==============================
// Forgot Password Schema
// ==============================
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: emailSchema,
  }),
});

// ==============================
// Reset Password Schema
// ==============================
export const resetPasswordSchema = z.object({
  body: z.object({
    password: passwordSchema,
  }),
  params: z.object({
    token: z.string().min(1, "Reset token is required"),
  }),
});