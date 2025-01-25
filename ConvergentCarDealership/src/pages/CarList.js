// src/pages/CarList.js
import React, { useEffect, useState } from 'react';

const CarList = () => {
  const [cars, setCars] = useState([]);          // State to store the list of cars
  const [loading, setLoading] = useState(true);  // State to manage loading status
  const [error, setError] = useState(null);      // State to handle errors

  useEffect(() => {
    console.log("CarList Mounted"); // Debugging: Verify component mounts

    const fetchCars = async () => {
      try {
        const response = await fetch('https://dealership.naman.zip/cars');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched cars:", data); // Debugging: Check fetched data
        setCars(data);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError(err.message);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchCars();

    return () => {
      console.log("CarList Unmounted"); // Debugging: Verify component unmounts
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Conditional Rendering Based on State
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (cars.length === 0) {
    return <p className="text-center">No cars available.</p>;
  }

  return (
    <div className="my-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Car Dealership</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.map(car => (
          <div key={car.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            {/* Display car image */}
            {car.image ? (
              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
            <div className="px-6 py-4">
              {/* Car Title */}
              <div className="font-bold text-purple-500 text-xl mb-2">
                {car.year} {car.make} {car.model}
              </div>
              {/* Car Details */}
              <ul className="text-gray-700 text-sm">
                <li>
                  <strong>Price:</strong> ${car.price.toLocaleString()}
                </li>
                {/* Since the sample data lacks these fields, we'll skip them */}
                {/* <li>
                  <strong>Mileage:</strong> {car.mileage.toLocaleString()} miles
                </li>
                <li>
                  <strong>Condition:</strong> {car.condition}
                </li>
                <li>
                  <strong>Fuel Type:</strong> {car.fuel_type}
                </li>
                <li>
                  <strong>Transmission:</strong> {car.transmission}
                </li>
                <li>
                  <strong>Color:</strong> {car.color}
                </li> */}
              </ul>
            </div>
            {/* Car Tags */}
            {car.tags && car.tags.length > 0 && (
              <div className="px-6 py-4">
                {car.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
