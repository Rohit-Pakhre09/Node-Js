import { Movie } from "../models/movie.model.js";

export const searchMovies = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ error: "Title query parameter is required" });
        }
        const result = await Movie.find({
            movieName: { $regex: title, $options: "i" }
        });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in searchMovies controller:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};
