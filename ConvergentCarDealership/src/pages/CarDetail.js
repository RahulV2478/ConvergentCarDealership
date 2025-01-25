// src/pages/CarDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
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
      } catch (error) {
        console.error("Error fetching car details:", error);
        setError(error.message);
      }
      setLoading(false);
    }

    fetchCar();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return (
      <div className="my-10 text-center">
        <p className="text-red-500">Error: {error}</p>
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
    <div className="max-w-4xl mx-auto my-10 p-5 border rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-5">{car.make} {car.model} ({car.year})</h1>
      <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full mb-5"/>
      <ul className="mb-5">
        <li><strong>Price:</strong> ${car.price}</li>
        <li><strong>Views:</strong> {car.views}</li>
        <li><strong>Downloads:</strong> {car.downloads}</li>
        <li><strong>Likes:</strong> {car.likes}</li>
        {/* Add more fields as needed */}
      </ul>
      <p className="text-gray-700 mb-5">{car.description}</p>
      <div className="mb-5">
        {car.tags.map((tag, index) => (
          <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #{tag}
          </span>
        ))}
      </div>
      <div className="text-center">
        <Link to="/" className="text-teal-500 hover:underline">Back to Home</Link>
      </div>
    </div>
  )
}

export default CarDetail;
