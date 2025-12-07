import { Movie } from "../models/movie.model.js";
import fs from "fs/promises";
import path from "path";

export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(404).json({ error: "Id is not provided!" });
        }

        const movie = await Movie.findOne({ mId: id });
        if (!movie) {
            res.status(404).json({ error: "No Movie Found!" });
        }

        if (movie.moviePoster) {
            const relativePath = movie.moviePoster.replace(/^\//, "");
            const aboslutePath = path.join(process.cwd(), relativePath);

            try {
                await fs.unlink(aboslutePath);
            } catch (error) {
                console.warn("Could not delete old image:", error.message);
            }
        }

        const result = await Movie.deleteOne({ mId: id });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getMovies controller:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};