import React from "react";
import "./App.css";

const Movie = ({ movie, addToFavorites, removeFromFavorites, isFavorite }) => {
  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <img
        width="200"
        alt={`The movie titled: ${movie.Title}`}
        src={movie.Poster}
      />
      <p>({movie.Year})</p>
      {isFavorite ? (
        <button onClick={() => removeFromFavorites(movie)}>Remove from Favorites</button>
      ) : (
        <button onClick={() => addToFavorites(movie)}>Add to Favorites</button>
      )}
    </div>
  );
};

export default Movie;
