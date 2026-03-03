// src/modules/movie/movie.routes.js
import express from "express";

import  {protect}  from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { aiLimiter } from "../../middlewares/rateLimit.middleware.js";

import { fetchMovieInsights } from "./movie.controller.js";
import { getMovieSchema } from "./movie.schema.js";

const router = express.Router();

// Protected movie insights route
router.post(
  "/analyze",
  protect,              // must be logged in
  aiLimiter,            // stricter limiter for AI calls
  validate(getMovieSchema),
  fetchMovieInsights
);

export default router;