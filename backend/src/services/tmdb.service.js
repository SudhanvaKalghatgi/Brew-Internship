// src/services/tmdb.service.js
import axios from "axios";
import ApiError from "../utils/ApiError.js";
import env from "../config/env.js";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// ==============================
// Get TMDB Movie ID from IMDb ID
// ==============================
const getTmdbIdFromImdb = async (imdbId) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/find/${imdbId}`,
      {
        params: {
          api_key: env.tmdbApiKey,
          external_source: "imdb_id",
        },
      }
    );

    const movieResults = response.data.movie_results;

    if (!movieResults || movieResults.length === 0) {
      throw new ApiError(404, "Movie not found");
    }

    return movieResults[0].id;
  } catch (error) {
    if (error.response) {
      throw new ApiError(
        error.response.status,
        "TMDB API error"
      );
    }
    throw error;
  }
};

// ==============================
// Get Full Movie Details
// ==============================
export const fetchMovieData = async (imdbId) => {
  const tmdbId = await getTmdbIdFromImdb(imdbId);

  try {
    const [detailsRes, creditsRes, reviewsRes] = await Promise.all([
      axios.get(`${TMDB_BASE_URL}/movie/${tmdbId}`, {
        params: { api_key: env.tmdbApiKey },
      }),
      axios.get(`${TMDB_BASE_URL}/movie/${tmdbId}/credits`, {
        params: { api_key: env.tmdbApiKey },
      }),
      axios.get(`${TMDB_BASE_URL}/movie/${tmdbId}/reviews`, {
        params: { api_key: env.tmdbApiKey },
      }),
    ]);

    const details = detailsRes.data;
    const credits = creditsRes.data;
    const reviews = reviewsRes.data;

    // Structure clean output
    return {
      title: details.title,
      poster: details.poster_path
        ? `${IMAGE_BASE_URL}${details.poster_path}`
        : null,
      releaseYear: details.release_date
        ? details.release_date.split("-")[0]
        : null,
      rating: details.vote_average,
      overview: details.overview,
      cast: credits.cast
        ?.slice(0, 10)
        .map((member) => member.name) || [],
      reviews: reviews.results
        ?.slice(0, 10)
        .map((review) => review.content) || [],
    };
  } catch (error) {
    if (error.response) {
      throw new ApiError(
        error.response.status,
        "TMDB API error"
      );
    }
    throw error;
  }
};