import React, { useReducer, useEffect, useState, useCallback } from "react";
import "./App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import ThemeToggle from "./ThemeToggle";
import Pagination from "./Pagination";
import Favorites from "./Favorites";
import { fetchMovies, fetchMovieDetails } from "./api";
import SearchHistory from "./SearchHistory";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  currentPage: 1,
  totalResults: 0,
  searchHistory: JSON.parse(localStorage.getItem("searchHistory")) || []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload.movies,
        totalResults: action.payload.totalResults
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    case "ADD_TO_FAVORITES":
      const updatedFavorites = [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return {
        ...state,
        favorites: updatedFavorites
      };
    case "REMOVE_FROM_FAVORITES":
      const filteredFavorites = state.favorites.filter(
        movie => movie.imdbID !== action.payload.imdbID
      );
      localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
      return {
        ...state,
        favorites: filteredFavorites
      };
    case "ADD_TO_SEARCH_HISTORY":
      const updatedHistory = [action.payload, ...state.searchHistory];
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      return {
        ...state,
        searchHistory: updatedHistory
      };
    case "SET_PAGE":
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    dispatch({ type: "CLEAR_SEARCH_HISTORY" });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    fetchMovies("man", state.currentPage).then(jsonResponse => {
      if (jsonResponse.Response === "True") {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: {
            movies: jsonResponse.Search,
            totalResults: jsonResponse.totalResults
          }
        });
      } else {
        dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: jsonResponse.Error
        });
      }
    });
  }, [state.currentPage]);

  const search = useCallback(
    (searchValue) => {
      dispatch({
        type: "SEARCH_MOVIES_REQUEST"
      });

      fetchMovies(searchValue, state.currentPage).then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: {
              movies: jsonResponse.Search,
              totalResults: jsonResponse.totalResults
            }
          });
          dispatch({
            type: "ADD_TO_SEARCH_HISTORY",
            payload: searchValue
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
    },
    [state.currentPage]
  );

  const addToFavorites = (movie) => {
    dispatch({
      type: "ADD_TO_FAVORITES",
      payload: movie
    });
  };

  const removeFromFavorites = (movie) => {
    dispatch({
      type: "REMOVE_FROM_FAVORITES",
      payload: movie
    });
  };

  const setPage = (pageNumber) => {
    dispatch({
      type: "SET_PAGE",
      payload: pageNumber
    });
  };

  const { movies, errorMessage, loading, favorites, currentPage, totalResults } = state;

  return (
    <div className="App">
      <Header text="MOVIES" />
      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
      <Search search={search} />
      <SearchHistory history={state.searchHistory} clearHistory={clearHistory} search={search} />
      <Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />
      <Pagination
        currentPage={currentPage}
        totalResults={totalResults}
        setPage={setPage}
      />
      <div className="movies">
        {loading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie
              key={`${index}-${movie.Title}`}
              movie={movie}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
