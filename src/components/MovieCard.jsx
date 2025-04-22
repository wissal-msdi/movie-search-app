import React from 'react';

function MovieCard({ movie, openModal }) {
  return (
    <div onClick={() => openModal(movie)} style={{ cursor: 'pointer', width: '200px' }}>
      <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"} alt={movie.Title} style={{ width: '100%' }} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  );
}

export default MovieCard;
