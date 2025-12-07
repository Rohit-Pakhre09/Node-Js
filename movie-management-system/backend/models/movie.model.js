import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        mId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },

        movieName: {
            type: String,
            required: [true, "Movie name is required"],
            trim: true,
            minlength: [2, "Movie name must be at least 2 characters"],
            maxlength: [100, "Movie name cannot exceed 100 characters"],
        },

        movieDescription: {
            type: String,
            trim: true,
            maxlength: [1000, "Description cannot exceed 1000 characters"],
        },

        movieGenre: {
            type: [String],
            enum: [
                "action",
                "adventure",
                "animation",
                "biography",
                "comedy",
                "crime",
                "documentary",
                "drama",
                "family",
                "fantasy",
                "horror",
                "mystery",
                "romance",
                "sci-fi",
                "thriller",
                "war",
                "western",
            ],
            default: [],
        },

        movieYear: {
            type: Number,
            min: [1888, "Movie year cannot be before 1888 (first film ever made)"],
            max: [new Date().getFullYear() + 1, "Invalid movie release year"],
        },

        durationMinutes: {
            type: Number,
            min: [1, "Duration must be at least 1 minute"],
            max: [600, "Duration cannot exceed 600 minutes"],
        },

        rating: {
            type: Number,
            min: 0,
            max: 10,
            default: 0,
        },

        languages: {
            type: [String],
            default: ["english"],
        },

        cast: {
            type: [String],
            trim: true,
            default: [],
        },

        moviePoster: {
            type: String,
            trim: true,
        },

        isPublished: {
            type: Boolean,
            default: true,
        },
    }, { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);