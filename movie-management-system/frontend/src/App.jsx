// src/App.jsx
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import MovieList from "./pages/MovieList";
import AddMoviePage from "./pages/AddMoviePage";
import EditMoviePage from "./pages/EditMoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        {/* Top Navbar */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2">
              {/* Small clapperboard icon */}
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-sky-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M4 5h16v14H4z" />
                  <path d="M4 9h16" />
                  <path d="M8 5l2 4" />
                  <path d="M12 5l2 4" />
                  <path d="M16 5l2 4" />
                </svg>
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-wide text-slate-50">
                  BIG PICTURES
                </span>
                <span className="text-xs text-slate-400">
                  Movie Management System.
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-3 text-sm">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg border text-xs md:text-sm ${isActive
                    ? "bg-sky-500/20 border-sky-500 text-sky-100"
                    : "border-slate-700 text-slate-300 hover:bg-slate-900"
                  }`
                }
              >
                Movie List
              </NavLink>
              <NavLink
                to="/movies/add"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium ${isActive
                    ? "bg-sky-500 text-slate-950"
                    : "bg-sky-500/90 hover:bg-sky-400 text-slate-950"
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                <span>Add Movie</span>
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movies/add" element={<AddMoviePage />} />
            <Route path="/movies/:id/edit" element={<EditMoviePage />} />
            <Route path="/movies/:id" element={<MovieDetailsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
