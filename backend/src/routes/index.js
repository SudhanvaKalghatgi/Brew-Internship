import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import movieRoutes from "../modules/movie/movie.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/movie", movieRoutes);

export default router;