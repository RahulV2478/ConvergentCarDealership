// src/components/CarCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CarCard = ({ car }) => {
  // Destructure the car object for cleaner access
  const {
    id,
    make,
    model,
    year,
    price,
    mileage,
    condition,
    fuel_type,
    transmission,
    color,
    image, // Ensure this matches the API response
    tags
  } = car;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <Link to={`/car/${id}`}>
        {/* Display car image */}
        {image ? (
          <img
            src={image}
            alt={`${make} ${model}`}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
      </Link>
      <div className="px-6 py-4">
        {/* Car Title */}
        <div className="font-bold text-purple-500 text-xl mb-2">
          {year} {make} {model}
        </div>
        {/* Car Details */}
        <ul className="text-gray-700 text-sm">
          <li>
            <strong>Price:</strong> ${price.toLocaleString()}
          </li>
          {/* Ensure these fields exist before rendering */}
          {mileage && (
            <li>
              <strong>Mileage:</strong> {mileage.toLocaleString()} miles
            </li>
          )}
          {condition && (
            <li>
              <strong>Condition:</strong> {condition}
            </li>
          )}
          {fuel_type && (
            <li>
              <strong>Fuel Type:</strong> {fuel_type}
            </li>
          )}
          {transmission && (
            <li>
              <strong>Transmission:</strong> {transmission}
            </li>
          )}
          {color && (
            <li>
              <strong>Color:</strong> {color}
            </li>
          )}
        </ul>
      </div>
      {/* Car Tags */}
      {tags && tags.length > 0 && (
        <div className="px-6 py-4">
          {tags.map((tag, index) => (
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
  );
};

// Adding PropTypes for type-checking
CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    mileage: PropTypes.number,
    condition: PropTypes.string,
    fuel_type: PropTypes.string,
    transmission: PropTypes.string,
    color: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default CarCard;
