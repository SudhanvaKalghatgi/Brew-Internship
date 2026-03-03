// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import env from "./config/env.js";
import { globalLimiter } from "./middlewares/rateLimit.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import mainRouter from "./routes/index.js";

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: "10kb" }));

// Cookie parser
app.use(cookieParser());

// Global rate limit
app.use(globalLimiter);

// Routes
app.use("/api/v1", mainRouter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error middleware (must be last)
app.use(errorMiddleware);

export default app;