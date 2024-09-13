export const fetchMovies = async (searchValue, page = 1) => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b&page=${page}`
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  };
  
  export const fetchMovieDetails = async (imdbID) => {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=4a3b711b`
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  };
  