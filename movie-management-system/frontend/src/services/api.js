import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const client = axios.create({
    baseURL: API_URL,
});

const buildPosterUrl = (moviePoster) => {
    if (!moviePoster) return null;

    let clean = String(moviePoster).trim();
    clean = clean.replace(/^\/+/, "");

    if (clean.startsWith("uploads/")) {
        return `${API_URL}/${clean}`;
    }

    return `${API_URL}/uploads/${clean}`;
};

export const apiService = {
    baseURL: API_URL,
    buildPosterUrl,

    async getMovies() {
        const res = await client.get("/movies");
        return res.data;
    },

    async searchMovies(title) {
        const res = await client.get("/movies/search", {
            params: { title },
        });
        return res.data; 
    },

    async getMovieById(id) {
        const res = await client.get(`/movies/${id}`);
        return res.data;
    },

    async addMovie(formValues) {
        const formData = new FormData();
        Object.entries(formValues).forEach(([key, value]) => {
            if (value === undefined || value === null || value === "") return;

            if (Array.isArray(value)) {
                formData.append(key, value.join(","));
            } else {
                formData.append(key, value);
            }
        });

        return client.post("/movies", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    async updateMovie(id, formValues) {
        const formData = new FormData();
        Object.entries(formValues).forEach(([key, value]) => {
            if (value === undefined || value === null || value === "") return;

            if (Array.isArray(value)) {
                formData.append(key, value.join(","));
            } else {
                formData.append(key, value);
            }
        });

        return client.put(`/movies/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    async deleteMovie(id) {
        return client.delete(`/movies/${id}`);
    },
};
