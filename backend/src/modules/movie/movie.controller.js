
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { getMovieInsights } from "./movie.service.js";

export const fetchMovieInsights = asyncHandler(async (req, res) => {
  const { imdbId } = req.body;

  const result = await getMovieInsights(imdbId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Movie insights fetched successfully", result));
});