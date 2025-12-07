import { Movie } from "../models/movie.model.js";

export const getMovies = async (req, res) => {
    try {
        const result = await Movie.find();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getMovies controller:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Id is not provided!" });
        }

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ error: "No movie found!" });
        }

        return res.status(200).json(movie);
    } catch (error) {
        console.error("Error in getMovieById controller:", error);
        return res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
};
