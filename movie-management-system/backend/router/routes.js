import express from "express";
import { upload } from "../middleware/upload.js";
import { addMovie } from "../controllers/addMovie.controller.js";
import { getMovieById, getMovies } from "../controllers/getMovie.controller.js";
import { updateMovie } from "../controllers/updateMovie.controller.js";
import { deleteMovie } from "../controllers/deleteMovie.controller.js";

const router = express.Router();

router.post("/", upload.single("moviePoster"), addMovie);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.put("/:id", upload.single("moviePoster"), updateMovie);
router.delete("/:id", deleteMovie);

export default router;
