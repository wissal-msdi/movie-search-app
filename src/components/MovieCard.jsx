const MovieCard = ({ movie }) => {
    const poster =
      movie.Poster === "N/A"
        ? "https://placehold.co/200x300?text=No+Image"
        : movie.Poster;
  
    return (
      <div
        style={{
          width: "200px",
          background: "#fff",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={poster}
          alt={movie.Title}
          style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "4px" }}
        />
        <h3 style={{ margin: "10px 0 5px" }}>{movie.Title}</h3>
        <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>{movie.Year}</p>
        <p style={{ margin: 0, fontSize: "13px", color: "#777" }}>{movie.Type}</p>
      </div>
    );
  };
  
  export default MovieCard;
  
  
  