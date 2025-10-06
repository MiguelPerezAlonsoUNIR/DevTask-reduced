import React from 'react';

const SearchBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, query: e.target.value });
  };

  return (
    <div className="relative w-full">
      {/* Magnifying Glass Icon */}
      <svg
        className="h-5 w-5 text-gray-800 dark:text-gray-200 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
          clipRule="evenodd"
        />
      </svg>

      {/* Input Field */}
      <input
        type="text"
        name="query"
        placeholder="Search tasks"
        value={filters.query}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-2 border rounded bg-white dark:bg-gray-800 
                   text-black dark:text-white 
                   placeholder-gray-500 dark:placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
