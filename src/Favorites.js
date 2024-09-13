import React from "react";
import "./App.css";

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="favorites">
      <h2>Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        favorites.map((movie, index) => (
          <div key={`${index}-${movie.Title}`} className="favorite-movie">
            <h3>{movie.Title}</h3>
            <p>({movie.Year})</p>
            <button onClick={() => removeFromFavorites(movie)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
