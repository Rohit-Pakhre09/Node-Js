import express from "express";
import { upload } from "../middleware/upload.js";
import { addMovie } from "../controllers/addMovie.controller.js";
import { getMovieById, getMovies } from "../controllers/getMovie.controller.js";
import { searchMovies } from "../controllers/searchMovie.controller.js";
import { updateMovie } from "../controllers/updateMovie.controller.js";
import { deleteMovie } from "../controllers/deleteMovie.controller.js";

const router = express.Router();

router.post("/movies", upload.single("moviePoster"), addMovie);
router.get("/movies", getMovies);
router.get("/movies/search", searchMovies);
router.get("/movies/:id", getMovieById);
router.put("/movies/:id", upload.single("moviePoster"), updateMovie);
router.delete("/movies/:id", deleteMovie);

export default router;
