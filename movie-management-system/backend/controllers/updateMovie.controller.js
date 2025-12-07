import { Movie } from "../models/movie.model.js";
import fs from "fs/promises";
import path from "path";
import { toArray } from "../utils/toArray.js";

export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;

        const {
            mId,
            movieName,
            movieDescription,
            movieGenre,
            movieYear,
            durationMinutes,
            rating,
            languages,
            cast,
            isPublished,
        } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Id is not provided!" });
        }

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ error: "No movie found!" });
        }

        const data = {};

        const genreArr = toArray(movieGenre);
        const languageArr = toArray(languages);
        const castArr = toArray(cast);

        if (mId) data.mId = mId;
        if (movieName) data.movieName = movieName;
        if (movieDescription) data.movieDescription = movieDescription;
        if (genreArr) data.movieGenre = genreArr;
        if (movieYear) data.movieYear = parseInt(movieYear, 10);
        if (durationMinutes) data.durationMinutes = parseInt(durationMinutes, 10);
        if (rating) data.rating = parseFloat(rating);
        if (languageArr) data.languages = languageArr;
        if (castArr) data.cast = castArr;

        if (typeof isPublished !== "undefined") {
            data.isPublished = isPublished === "true" || isPublished === true;
        }

        if (file) {
            const poster = movie.moviePoster;

            if (poster) {
                const relativePath = poster.replace(/^\//, "");
                const absolutePath = path.join(process.cwd(), relativePath);

                try {
                    await fs.unlink(absolutePath);
                } catch (error) {
                    console.warn("Could not delete old image:", error.message);
                }
            }

            data.moviePoster = `/uploads/${file.filename}`;
        }

        const result = await Movie.updateOne({ _id: movie._id }, { $set: data });
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error in updateMovie controller:", error);
        return res
            .status(500)
            .json({ error: "Internal server error", details: error.message });
    }
};
