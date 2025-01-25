// src/pages/CarDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`https://dealership.naman.zip/car/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Car not found');
          } else {
            throw new Error('Failed to fetch car details');
          }
        }
        const data = await response.json();
        setCar(data);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading car details...</p>;
  }

  if (error) {
    return (
      <div className="my-10 text-center">
        <p className="text-red-500 font-bold">Error: {error}</p>
        <Link to="/" className="text-teal-500 hover:underline mt-4 block">
          Go back to Home
        </Link>
      </div>
    );
  }

  if (!car) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {car.make} {car.model} ({car.year})
      </h1>
      {/* 
        Using 'flex flex-col md:flex-row gap-8' ensures 
        a vertical stack on mobile, and a row with gap 
        between columns on medium+ screens.
      */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2">
          <ul className="text-lg space-y-3 mb-6">
            <li><strong>Price:</strong> ${car.price?.toLocaleString()}</li>
            <li><strong>Mileage:</strong> {car.mileage?.toLocaleString()} miles</li>
            <li><strong>Condition:</strong> {car.condition}</li>
            <li><strong>Fuel Type:</strong> {car.fuel_type}</li>
            <li><strong>Transmission:</strong> {car.transmission}</li>
            <li><strong>Color:</strong> {car.color}</li>
            <li><strong>VIN:</strong> {car.vin}</li>
          </ul>
          <p className="text-gray-700">{car.description}</p>
          {car.tags && (
            <div className="mt-6">
              {car.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="text-center mt-6">
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
