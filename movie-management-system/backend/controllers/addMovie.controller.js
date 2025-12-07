import { Movie } from "../models/movie.model.js";
import { toArray } from "../utils/toArray.js";

export const addMovie = async (req, res) => {
    try {
        const { mId, movieName, movieDescription, movieGenre, movieYear, durationMinutes, rating, languages, cast, isPublished } = req.body;
        const file = req.file;

        if (!mId || !movieName || !movieDescription || !movieGenre || !movieYear || !durationMinutes || !rating || !languages || !cast || !isPublished) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        if (!file) {
            return res.status(400).json({ error: "Movie poster is not provided" });
        }

        const genreArray = toArray(movieGenre);
        const languagesArray = toArray(languages);
        const castArray = toArray(cast);

        const uploadFilePath = `/uploads/${file.filename}`;

        const newMovie = new Movie({
            mId,
            movieName,
            movieDescription,
            movieGenre: genreArray,
            movieYear: parseInt(movieYear),
            durationMinutes: parseInt(durationMinutes),
            rating: parseFloat(rating),
            languages: languagesArray,
            cast: castArray,
            moviePoster: uploadFilePath,
            isPublished: isPublished === 'true' || isPublished === true
        });

        const savedMovie = await newMovie.save();
        res.status(201).json({ savedMovie });
    } catch (error) {
        console.error("Error in addMovie controller:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};
