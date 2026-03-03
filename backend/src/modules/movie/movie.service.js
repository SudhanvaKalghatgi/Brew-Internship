// src/modules/movie/movie.service.js
import ApiError from "../../utils/ApiError.js";
import { fetchMovieData } from "../../services/tmdb.service.js";
import { analyzeReviewsWithAI } from "../../services/ai.service.js";

export const getMovieInsights = async (imdbId) => {
  if (!imdbId) {
    throw new ApiError(400, "IMDb ID is required");
  }

  // 1️⃣ Fetch movie metadata + reviews from TMDB
  const movieData = await fetchMovieData(imdbId);

  if (!movieData) {
    throw new ApiError(404, "Movie not found");
  }

  const {
    title,
    poster,
    releaseYear,
    rating,
    overview,
    cast,
    reviews,
  } = movieData;

  // 2️⃣ AI analysis of reviews
  const aiResult = await analyzeReviewsWithAI(reviews);

  // 3️⃣ Final structured response
  return {
    movie: {
      title,
      poster,
      releaseYear,
      rating,
      overview,
      cast,
    },
    insights: {
      summary: aiResult.summary,
      sentiment: aiResult.sentiment,
    },
  };
};