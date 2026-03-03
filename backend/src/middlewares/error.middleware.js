// src/middlewares/error.middleware.js
import env from "../config/env.js";

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // ==============================
  // MongoDB Duplicate Key Error
  // ==============================
  if (err.code === 11000) {
    statusCode = 409;
    message = "Resource already exists";
  }

  // ==============================
  // JWT Errors
  // ==============================
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  const response = {
    success: false,
    message,
  };

  // Attach validation errors if present
  if (err.errors) {
    response.errors = err.errors;
  }

  // Show stack only in development
  if (env.nodeEnv === "development") {
    response.stack = err.stack;
  }

  // Never leak stack in production
  return res.status(statusCode).json(response);
};

export default errorMiddleware;