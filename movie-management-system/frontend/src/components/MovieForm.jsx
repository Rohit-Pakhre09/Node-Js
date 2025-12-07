import { useState } from "react";

const GENRES = [
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
];

const initialErrors = {
    movieName: "",
    movieYear: "",
    mId: "",
};

const validate = (values) => {
    const errors = { ...initialErrors };

    if (!values.mId || !values.mId.trim()) {
        errors.mId = "Movie ID is required.";
    }

    if (!values.movieName || !values.movieName.trim()) {
        errors.movieName = "Movie title is required.";
    } else if (values.movieName.trim().length < 2) {
        errors.movieName = "Title must be at least 2 characters.";
    }

    if (values.movieYear) {
        const yearNum = Number(values.movieYear);
        if (Number.isNaN(yearNum)) {
            errors.movieYear = "Year must be a number.";
        } else if (yearNum < 1888) {
            errors.movieYear = "Year cannot be before 1888.";
        } else if (yearNum > new Date().getFullYear() + 1) {
            errors.movieYear = "Year is too far in the future.";
        }
    }

    return errors;
};

const MovieForm = ({ initialValues, onSubmit, submitting = false }) => {
    const [values, setValues] = useState({
        mId: initialValues?.mId || "",
        movieName: initialValues?.movieName || "",
        movieDescription: initialValues?.movieDescription || "",
        movieGenre: initialValues?.movieGenre || [],
        movieYear: initialValues?.movieYear || "",
        durationMinutes: initialValues?.durationMinutes || "",
        rating: initialValues?.rating ?? "",
        languages: initialValues?.languages?.join(", ") || "",
        cast: initialValues?.cast?.join(", ") || "",
        isPublished: initialValues?.isPublished ?? true,
        moviePoster: null, 
    });

    const [errors, setErrors] = useState(initialErrors);

    const handleChange = (field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleGenreToggle = (genre) => {
        setValues((prev) => {
            const exists = prev.movieGenre.includes(genre);
            return {
                ...prev,
                movieGenre: exists
                    ? prev.movieGenre.filter((g) => g !== genre)
                    : [...prev.movieGenre, genre],
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);

        const hasError = Object.values(validationErrors).some(Boolean);
        if (hasError) return;

        const payload = {
            ...values,
            languages: values.languages
                ? values.languages
                    .split(",")
                    .map((l) => l.trim())
                    .filter(Boolean)
                : [],
            cast: values.cast
                ? values.cast
                    .split(",")
                    .map((c) => c.trim())
                    .filter(Boolean)
                : [],
        };

        onSubmit(payload);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 md:p-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Movie ID */}
                <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Movie ID
                    </label>
                    <input
                        type="text"
                        value={values.mId}
                        onChange={(e) => handleChange("mId", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    {errors.mId && (
                        <p className="mt-1 text-xs text-red-400">{errors.mId}</p>
                    )}
                </div>

                {/* Title */}
                <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Title
                    </label>
                    <input
                        type="text"
                        value={values.movieName}
                        onChange={(e) => handleChange("movieName", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    {errors.movieName && (
                        <p className="mt-1 text-xs text-red-400">{errors.movieName}</p>
                    )}
                </div>

                {/* Year */}
                <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Release Year
                    </label>
                    <input
                        type="number"
                        value={values.movieYear}
                        onChange={(e) => handleChange("movieYear", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    {errors.movieYear && (
                        <p className="mt-1 text-xs text-red-400">{errors.movieYear}</p>
                    )}
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Duration (minutes)
                    </label>
                    <input
                        type="number"
                        value={values.durationMinutes}
                        onChange={(e) => handleChange("durationMinutes", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Rating (0–10)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={values.rating}
                        onChange={(e) => handleChange("rating", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>

                {/* Languages */}
                <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Languages (comma separated)
                    </label>
                    <input
                        type="text"
                        value={values.languages}
                        onChange={(e) => handleChange("languages", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>

                {/* Cast */}
                <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Cast (comma separated)
                    </label>
                    <input
                        type="text"
                        value={values.cast}
                        onChange={(e) => handleChange("cast", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Description
                </label>
                <textarea
                    rows={3}
                    value={values.movieDescription}
                    onChange={(e) => handleChange("movieDescription", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                />
            </div>

            {/* Genres */}
            <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                    Genres
                </label>
                <div className="flex flex-wrap gap-2">
                    {GENRES.map((genre) => {
                        const active = values.movieGenre.includes(genre);
                        return (
                            <button
                                type="button"
                                key={genre}
                                onClick={() => handleGenreToggle(genre)}
                                className={`px-2.5 py-1 rounded-full text-xs border ${active
                                        ? "bg-sky-500 text-slate-950 border-sky-500"
                                        : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                                    }`}
                            >
                                {genre}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Published + Poster */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
                <div className="flex items-center gap-3">
                    <label className="text-xs font-medium text-slate-300">
                        Published
                    </label>
                    <button
                        type="button"
                        onClick={() =>
                            handleChange("isPublished", !values.isPublished)
                        }
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs ${values.isPublished
                                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/60"
                                : "bg-slate-900 text-slate-300 border-slate-700"
                            }`}
                    >
                        <span
                            className={`h-2 w-2 rounded-full ${values.isPublished ? "bg-emerald-400" : "bg-slate-500"
                                }`}
                        />
                        <span>{values.isPublished ? "Published" : "Unpublished"}</span>
                    </button>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Movie Poster
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            handleChange("moviePoster", e.target.files?.[0] || null)
                        }
                        className="w-full text-xs text-slate-300 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-sky-500 file:text-slate-950 file:text-xs file:font-medium hover:file:bg-sky-400"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-slate-950 text-sm font-medium hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-60"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                    </svg>
                    <span>{submitting ? "Saving..." : "Save Movie"}</span>
                </button>
            </div>
        </form>
    );
};

export default MovieForm;
