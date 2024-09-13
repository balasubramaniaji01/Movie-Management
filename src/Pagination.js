import React from "react";
import "./App.css";

const Pagination = ({ currentPage, totalResults, setPage }) => {
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="pagination">
      <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
