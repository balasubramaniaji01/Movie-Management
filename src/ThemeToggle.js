import React from "react";

const ThemeToggle = ({ toggleTheme, theme }) => {
  return (
    <div className="theme-toggle">
      <button onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
    </div>
  );
};

export default ThemeToggle;
