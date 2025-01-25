// src/components/CarSearch.js
import React, { useState } from 'react';

const CarSearch = ({ searchCars }) => {
  const [text, setText] = useState('');
  const [sortKey, setSortKey] = useState('make'); // Default sort key
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

  const onSubmit = (e) => {
    e.preventDefault();
    searchCars(text.trim(), sortKey, sortDirection);
    setText(''); // Optional: Clear input after search
  };

  return (
    <div className="max-w-sm rounded overflow-hidden my-10 mx-auto">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="flex flex-col items-center border-b border-b-2 border-teal-500 py-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none mb-4"
            type="text"
            placeholder="Search Car Make or Model..."
          />
          {/* Sorting Options */}
          <div className="flex flex-col items-start w-full mb-4">
            <div className="mb-2 w-full">
              <label className="block text-gray-700 mb-1">Sort By:</label>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              >
                <option value="make">Make</option>
                <option value="model">Model</option>
                <option value="year">Year</option>
                <option value="price">Price</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block text-gray-700 mb-1">Direction:</label>
              <select
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
          <button
            className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-4 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarSearch;
