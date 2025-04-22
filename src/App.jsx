import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import "./app.css"; // Import the CSS file for styling

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const searchMovies = async (searchTerm) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`);
      const data = await response.json();
  
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error); // e.g. "Movie not found!"
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

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleSearch = () => {
    searchMovies(searchTerm); // Trigger search on button click
  };

  return (
    <div className={isDarkMode ? "dark-theme" : "light-theme"} style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h1>🎬 Movie Search App</h1>

      {/* Search Input & Button */}
      <input
        type="text"
        placeholder="Search for movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "80%", padding: "10px", marginBottom: "20px" }}
      />
      <button 
        onClick={handleSearch} 
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Search
      </button>

      {/* Dark/Light Theme Toggle */}
      <button 
        onClick={toggleTheme} 
        style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}
      >
        Toggle Theme
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} openModal={openModal} />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>{selectedMovie.Title}</h2>
            <p><strong>Year:</strong> {selectedMovie.Year}</p>
            <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
            <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
