// src/pages/CarSort.js
import React, { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';
import { useLocation, useHistory } from 'react-router-dom';

const CarSort = () => {
  const [cars, setCars] = useState([]);         // State to store the list of cars
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null);     // State to handle errors

  const location = useLocation();
  const history = useHistory();

  // Parse query parameters from the URL
  const query = new URLSearchParams(location.search);
  const direction = query.get('direction') || 'asc';
  const key = query.get('key') || 'make';

  useEffect(() => {
    const fetchSortedCars = async () => {
      setLoading(true);
      try {
        // Construct the fetch URL using direction and key from the query parameters
        const response = await fetch(
          `https://dealership.naman.zip/cars/sort?direction=${encodeURIComponent(direction)}&key=${encodeURIComponent(key)}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched sorted cars:', data); // Debugging: Check fetched data
        setCars(data);
      } catch (err) {
        console.error('Error fetching sorted cars:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSortedCars();
  }, [direction, key]); // Re-run whenever direction or key changes

  // Update the query parameters for "key" (sort key)
  const handleSortChange = (e) => {
    const newSortKey = e.target.value;
    const newQuery = new URLSearchParams(location.search);
    newQuery.set('key', newSortKey);
    history.push({ pathname: location.pathname, search: newQuery.toString() });
  };

  // Update the query parameters for "direction" (asc or desc)
  const handleDirectionChange = (e) => {
    const newDirection = e.target.value;
    const newQuery = new URLSearchParams(location.search);
    newQuery.set('direction', newDirection);
    history.push({ pathname: location.pathname, search: newQuery.toString() });
  };

  // Conditional Rendering Based on State
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (cars.length === 0) {
    return <p className="text-center">No cars found matching your sort criteria.</p>;
  }

  return (
    <div className="my-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Search</h2>

      {/* Sort Controls */}
      <div className="flex justify-center mb-6 space-x-4">
        <div>
          <label htmlFor="sortKey" className="mr-2">
            Sort By:
          </label>
          <select
            id="sortKey"
            value={key}
            onChange={handleSortChange}
            className="border p-1"
          >
            <option value="make">Make</option>
            <option value="model">Model</option>
            <option value="year">Year</option>
            <option value="price">Price</option>
            {/* Add more sort keys as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="sortDirection" className="mr-2">
            Direction:
          </label>
          <select
            id="sortDirection"
            value={direction}
            onChange={handleDirectionChange}
            className="border p-1"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Display the Sorted Cars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarSort;
