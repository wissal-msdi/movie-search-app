import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("batman");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const searchMovies = async (query) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError("Something went wrong.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      searchMovies(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h1>🎬 Movie Search App</h1>

      <input
        type="text"
        placeholder="Search for movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
      />

{!loading && !error && movies.length === 0 && (
  <p style={{ color: "gray" }}>No movies found.</p>
)}

{error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
