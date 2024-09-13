import React from "react";
import "./App.css";

const SearchHistory = ({ history, clearHistory, search }) => {
  return (
    <div className="search-history">
      <h3>Search History</h3>
      {history.length === 0 ? (
        <p>No search history yet.</p>
      ) : (
        <>
          <ul>
            {history.map((term, index) => (
              <li key={index} onClick={() => search(term)}>
                {term}
              </li>
            ))}
          </ul>
          <button className="clear-history" onClick={clearHistory}>
            Clear Search History
          </button>
        </>
      )}
    </div>
  );
};

export default SearchHistory;
