import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../services/api";
import fallbackMovie from "../assets/fallbackMovie.png";

// Normalize backend response into a plain array of movies
const normalizeMovies = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    if (data && Array.isArray(data.movies)) return data.movies;
    return null;
};

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await apiService.getMovies();
            const moviesArray = normalizeMovies(data);

            if (moviesArray) {
                setMovies(moviesArray);
            } else {
                console.log("Unexpected movies response:", data);
                setError("Invalid response from server.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch movies.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            fetchMovies();
            return;
        }

        try {
            setLoading(true);
            setError("");
            const data = await apiService.searchMovies(searchTerm.trim());
            const moviesArray = normalizeMovies(data);

            if (moviesArray) {
                setMovies(moviesArray);
            } else {
                console.log("Unexpected search response:", data);
                setError("Invalid response from server.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to search movies.");
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setSearchTerm("");
        fetchMovies();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this movie?")) return;

        try {
            setDeletingId(id);
            await apiService.deleteMovie(id);
            setMovies(movies.filter(movie => movie._id !== id));
        } catch (err) {
            console.error(err);
            setError("Failed to delete movie.");
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div>
            {/* Header + search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-50">
                        Movies
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Browse all movies or search by title.
                    </p>
                </div>

                <form
                    onSubmit={handleSearch}
                    className="w-full md:w-auto flex flex-col sm:flex-row gap-2 sm:items-center"
                >
                    <div className="relative flex-1 min-w-[220px]">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <circle cx="11" cy="11" r="6" />
                                <path d="M16 16l4 4" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search by title"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-sky-500 text-slate-950 text-sm font-medium hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-60"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>

                    {searchTerm && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="px-3 py-2 rounded-lg bg-slate-800 text-slate-100 text-xs font-medium hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        >
                            Clear
                        </button>
                    )}
                </form>
            </div>

            {/* Error state */}
            {error && (
                <div className="mb-4 rounded-lg border border-red-600/60 bg-red-900/30 px-4 py-3 text-red-200 text-sm">
                    {error}
                </div>
            )}

            {/* Loading state */}
            {loading && (
                <div className="py-10 flex flex-col items-center justify-center gap-3">
                    <div className="h-8 w-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
                    <p className="text-slate-400 text-sm">Loading movies...</p>
                </div>
            )}

            {/* Movie grid */}
            {!loading && movies.length > 0 && (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {movies.map((movie) => {
                        const posterUrl = apiService.buildPosterUrl(movie.moviePoster);

                        return (
                            <Link
                                key={movie._id}
                                to={`/movies/${movie._id}`}
                                className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 rounded-2xl overflow-hidden shadow-[0_18px_40px_rgba(15,23,42,0.9)] hover:shadow-[0_22px_50px_rgba(8,47,73,0.9)] transition transform hover:-translate-y-1 hover:border-sky-500/80"
                            >
                                {/* Poster */}
                                <div className="relative w-full aspect-[2/3] overflow-hidden bg-slate-800">
                                    <img
                                        src={posterUrl || fallbackMovie}
                                        alt={movie.movieName}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            // If image fails, fallback to placeholder
                                            e.currentTarget.src = fallbackMovie;
                                        }}
                                    />

                                    {/* Top-left tag (e.g. Published / Draft) */}
                                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur text-[10px] font-medium text-slate-100 border border-slate-700/70">
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${movie.isPublished ? "bg-emerald-400" : "bg-slate-500"
                                                }`}
                                        />
                                        <span>{movie.isPublished ? "Published" : "Draft"}</span>
                                    </div>

                                    {/* Rating badge */}
                                    {typeof movie.rating === "number" && (
                                        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/70 backdrop-blur text-[11px] font-semibold text-yellow-300 flex items-center gap-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M12 3l2.39 4.85L20 9.27l-3.8 3.7L17.48 19 12 16.27 6.52 19l1.28-6.03L4 9.27l5.61-1.42L12 3z" />
                                            </svg>
                                            <span>
                                                {movie.rating.toFixed ? movie.rating.toFixed(1) : movie.rating}
                                            </span>
                                        </div>
                                    )}

                                    {/* Bottom gradient overlay */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none" />

                                    {/* Year + duration over poster bottom-left */}
                                    <div className="absolute bottom-2 left-2 flex items-center gap-2 text-[11px] text-slate-200">
                                        {movie.movieYear && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur border border-slate-800/80">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3 w-3"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                >
                                                    <path d="M5 4h14v16H5z" />
                                                    <path d="M5 9h14" />
                                                </svg>
                                                <span>{movie.movieYear}</span>
                                            </span>
                                        )}

                                        {movie.durationMinutes && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur border border-slate-800/80">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3 w-3"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                >
                                                    <circle cx="12" cy="12" r="9" />
                                                    <path d="M12 7v5l3 2" />
                                                </svg>
                                                <span>{movie.durationMinutes} min</span>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-4 flex flex-col gap-2">
                                    {/* Title + year */}
                                    <div className="flex items-start justify-between gap-2">
                                        <h2 className="text-sm md:text-base font-semibold text-slate-50 line-clamp-2">
                                            {movie.movieName}
                                        </h2>
                                        {movie.movieYear && (
                                            <span className="hidden sm:inline-flex text-[11px] md:text-xs text-slate-400 whitespace-nowrap">
                                                {movie.movieYear}
                                            </span>
                                        )}
                                    </div>

                                    {/* Genres */}
                                    {Array.isArray(movie.movieGenre) && movie.movieGenre.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {movie.movieGenre.slice(0, 3).map((genre) => (
                                                <span
                                                    key={genre}
                                                    className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 text-[11px]"
                                                >
                                                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                                                </span>
                                            ))}
                                            {movie.movieGenre.length > 3 && (
                                                <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 text-[11px]">
                                                    +{movie.movieGenre.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Meta row: languages + rating */}
                                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                                        {Array.isArray(movie.languages) && movie.languages.length > 0 && (
                                            <span className="inline-flex items-center gap-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3 w-3"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                >
                                                    <path d="M4 5h16v4H4z" />
                                                    <path d="M4 10h16v9H4z" />
                                                </svg>
                                                <span>
                                                    {movie.languages.slice(0, 2).map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")}
                                                    {movie.languages.length > 2 && ` +${movie.languages.length - 2}`}
                                                </span>
                                            </span>
                                        )}

                                        {typeof movie.rating === "number" && (
                                            <span className="inline-flex items-center gap-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3 w-3"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M12 3l2.39 4.85L20 9.27l-3.8 3.7L17.48 19 12 16.27 6.52 19l1.28-6.03L4 9.27l5.61-1.42L12 3z" />
                                                </svg>
                                                <span>{movie.rating}/10</span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    {movie.movieDescription && (
                                        <p className="text-[11px] md:text-xs text-slate-400 line-clamp-3 mt-1">
                                            {movie.movieDescription}
                                        </p>
                                    )}

                                    {/* Action buttons */}
                                    <div className="flex gap-2 mt-3">
                                        <Link
                                            to={`/movies/${movie._id}/edit`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-sky-500 text-slate-950 text-xs font-medium hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3.5 w-3.5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                            >
                                                <path d="M4 20h4l10-10-4-4L4 16v4z" />
                                            </svg>
                                            <span>Edit</span>
                                        </Link>

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleDelete(movie._id);
                                            }}
                                            disabled={deletingId === movie._id}
                                            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-slate-100 text-xs font-medium hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3.5 w-3.5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                            >
                                                <path d="M6 7h12" />
                                                <path d="M10 11v6" />
                                                <path d="M14 11v6" />
                                                <path d="M9 7V5h6v2" />
                                                <path d="M7 7l1 12h8l1-12" />
                                            </svg>
                                            <span>{deletingId === movie._id ? "Deleting..." : "Delete"}</span>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Empty state */}
            {!loading && movies.length === 0 && !error && (
                <div className="py-10 text-center text-slate-400 text-sm">
                    No movies found.
                </div>
            )}
        </div>
    );
};

export default MovieList;
