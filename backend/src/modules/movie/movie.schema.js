// src/modules/movie/movie.schema.js
import { z } from "zod";

// IMDb ID pattern:
// - starts with "tt"
// - followed by 7 or 8 digits
const imdbIdPattern = /^tt\d{7,8}$/;

export const getMovieSchema = z.object({
  body: z.object({
    imdbId: z
      .string()
      .trim()
      .regex(imdbIdPattern, "Invalid IMDb ID format"),
  }),
});