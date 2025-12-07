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

        const result = await Movie.findOne({ mId: id });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getMovies controller:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};