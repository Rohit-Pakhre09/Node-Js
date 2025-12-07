// src/pages/EditMoviePage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieForm from "../components/MovieForm";
import { apiService } from "../services/api";

const EditMoviePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const loadMovie = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await apiService.getMovieById(id);
            setInitialData(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load movie details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovie();
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            setSubmitting(true);
            setError("");
            await apiService.updateMovie(id, values);
            navigate(`/movies/${id}`);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Failed to update movie.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="py-10 flex flex-col items-center justify-center gap-3">
                <div className="h-8 w-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
                <p className="text-slate-400 text-sm">Loading movie...</p>
            </div>
        );
    }

    if (!initialData) {
        return (
            <div className="py-10 text-center text-slate-400 text-sm">
                Movie not found.
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-50 mb-1">
                    Edit Movie
                </h1>
                <p className="text-sm text-slate-400">
                    Update the details for this movie.
                </p>
            </div>

            {error && (
                <div className="rounded-lg border border-red-600/60 bg-red-900/30 px-4 py-3 text-red-200 text-sm">
                    {error}
                </div>
            )}

            <MovieForm
                initialValues={initialData}
                onSubmit={handleSubmit}
                submitting={submitting}
            />
        </div>
    );
};

export default EditMoviePage;
