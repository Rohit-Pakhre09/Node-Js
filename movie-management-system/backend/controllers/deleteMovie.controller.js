import { Movie } from "../models/movie.model.js";
import fs from "fs/promises";
import path from "path";

export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Id is not provided!" });
        }

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ error: "No Movie Found!" });
        }

        if (movie.moviePoster) {
            const relativePath = movie.moviePoster.replace(/^\//, "");
            const absolutePath = path.join(process.cwd(), relativePath);

            try {
                await fs.unlink(absolutePath);
            } catch (error) {
                console.warn("Could not delete old image:", error.message);
            }
        }

        await Movie.findByIdAndDelete(id);
        return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        console.error("Error in deleteMovie controller:", error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};
