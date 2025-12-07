import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieForm from "../components/MovieForm";
import { apiService } from "../services/api";

const AddMoviePage = () => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            setSubmitting(true);
            setError("");

            await apiService.addMovie(values);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Failed to add movie.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-50 mb-1">
                    Add Movie
                </h1>
                <p className="text-sm text-slate-400">
                    Fill in the details to add a new movie.
                </p>
            </div>

            {error && (
                <div className="rounded-lg border border-red-600/60 bg-red-900/30 px-4 py-3 text-red-200 text-sm">
                    {error}
                </div>
            )}

            <MovieForm onSubmit={handleSubmit} submitting={submitting} />
        </div>
    );
};

export default AddMoviePage;
