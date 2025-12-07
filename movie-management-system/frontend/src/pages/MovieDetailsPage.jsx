import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiService } from "../services/api";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    const loadMovie = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await apiService.getMovieById(id);
            setMovie(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load movie details.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this movie?")) return;
        try {
            setDeleting(true);
            await apiService.deleteMovie(id);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Failed to delete movie.");
            setDeleting(false);
        }
    };

    useEffect(() => {
        loadMovie();
    }, [id]);

    if (loading) {
        return (
            <div className="py-10 flex flex-col items-center justify-center gap-3">
                <div className="h-8 w-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
                <p className="text-slate-400 text-sm">Loading movie...</p>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="py-10 text-center text-slate-400 text-sm">
                Movie not found.
            </div>
        );
    }

    const posterUrl = apiService.buildPosterUrl(movie.moviePoster);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-50">
                        {movie.movieName}
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        {movie.movieYear && <span>{movie.movieYear}</span>}{" "}
                        {movie.isPublished === false && (
                            <span className="ml-2 text-xs px-2 py-0.5 rounded-full border border-slate-600 text-slate-300">
                                Unpublished
                            </span>
                        )}
                    </p>
                </div>

                <div className="flex gap-2">
                    <Link
                        to={`/movies/${movie._id}/edit`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs md:text-sm text-slate-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path d="M4 20h4l10-10-4-4L4 16v4z" />
                        </svg>
                        <span>Edit</span>
                    </Link>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-500 text-xs md:text-sm text-slate-50 disabled:opacity-60"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path d="M6 7h12" />
                            <path d="M9 7V5h6v2" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M7 7l1 12h8l1-12" />
                        </svg>
                        <span>{deleting ? "Deleting..." : "Delete"}</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Poster */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden md:w-2/5 aspect-2/3">
                    {posterUrl ? (
                        <img
                            src={posterUrl}
                            alt={movie.movieName}
                            className="w-full h-full object-cover object-center"
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                            No poster available
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4 md:flex-1">
                    {movie.movieDescription && (
                        <div>
                            <h2 className="text-sm font-semibold text-slate-200 mb-1.5">
                                Overview
                            </h2>
                            <p className="text-sm text-slate-300">
                                {movie.movieDescription}
                            </p>
                        </div>
                    )}

                    {movie.movieGenre && movie.movieGenre.length > 0 && (
                        <div>
                            <h2 className="text-sm font-semibold text-slate-200 mb-1.5">
                                Genres
                            </h2>
                            <div className="flex flex-wrap gap-1.5">
                                {movie.movieGenre.map((genre) => (
                                    <span
                                        key={genre}
                                        className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200 text-xs"
                                    >
                                        {genre.charAt(0).toUpperCase() + genre.slice(1)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {movie.languages && movie.languages.length > 0 && (
                        <div>
                            <h2 className="text-sm font-semibold text-slate-200 mb-1.5">
                                Languages
                            </h2>
                            <p className="text-sm text-slate-300">
                                {movie.languages.map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")}
                            </p>
                        </div>
                    )}

                    {movie.cast && movie.cast.length > 0 && (
                        <div>
                            <h2 className="text-sm font-semibold text-slate-200 mb-1.5">
                                Cast
                            </h2>
                            <p className="text-sm text-slate-300">
                                {movie.cast.join(", ")}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-800 mt-3 text-sm text-slate-300">
                        {movie.durationMinutes && (
                            <span>
                                Duration: {movie.durationMinutes} min
                            </span>
                        )}
                        {movie.rating !== undefined && (
                            <span>
                                Rating: {movie.rating}/10
                            </span>
                        )}
                        <span>ID: {movie.mId}</span>
                    </div>
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-red-600/60 bg-red-900/30 px-4 py-3 text-red-200 text-sm">
                    {error}
                </div>
            )}
        </div>
    );
};

export default MovieDetailsPage;
