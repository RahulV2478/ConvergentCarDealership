// src/pages/AddCar.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddCar = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    image: '',
    tags: '',
    views: 0,
    downloads: 0,
    likes: 0,
    mileage: '',
    condition: '',
    fuel_type: '',
    transmission: '',
    color: '',
    vin: '',
    description: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'tags' ? value : value // Tags will be handled separately
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    // Prepare data
    const dataToSend = {
      ...formData,
      year: Number(formData.year),
      price: Number(formData.price),
      tags: formData.tags.split(',').map(tag => tag.trim()),
      views: Number(formData.views),
      downloads: Number(formData.downloads),
      likes: Number(formData.likes),
      mileage: Number(formData.mileage)
    };

    try {
      const response = await fetch('https://dealership.naman.zip/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
      if (!response.ok) {
        throw new Error('Failed to add car');
      }
      const result = await response.json();
      console.log("Car added:", result);
      setSuccess(true);
      // Redirect to home after successful addition
      history.push('/');
    } catch (error) {
      console.error("Error adding car:", error);
      setError('Failed to add car. Please try again.');
    }
  };

  return (
    <div className='max-w-md mx-auto my-10 p-5 border rounded shadow'>
      <h2 className='text-2xl mb-5 text-center'>Add a New Car</h2>
      {success && <p className='text-green-500 text-center'>Car added successfully!</p>}
      {error && <p className='text-red-500 text-center'>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Make */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Make:</label>
          <input 
            type='text' 
            name='make'
            value={formData.make}
            onChange={handleChange}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Model */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Model:</label>
          <input 
            type='text' 
            name='model'
            value={formData.model}
            onChange={handleChange}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Year */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Year:</label>
          <input 
            type='number' 
            name='year'
            value={formData.year}
            onChange={handleChange}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Price */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Price (USD):</label>
          <input 
            type='number' 
            name='price'
            value={formData.price}
            onChange={handleChange}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Image URL */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Image URL:</label>
          <input 
            type='text' 
            name='image'
            value={formData.image}
            onChange={handleChange}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Tags */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Tags (comma-separated):</label>
          <input 
            type='text' 
            name='tags'
            value={formData.tags}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Views */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Views:</label>
          <input 
            type='number' 
            name='views'
            value={formData.views}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Downloads */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Downloads:</label>
          <input 
            type='number' 
            name='downloads'
            value={formData.downloads}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Likes */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Likes:</label>
          <input 
            type='number' 
            name='likes'
            value={formData.likes}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Mileage */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Mileage:</label>
          <input 
            type='number' 
            name='mileage'
            value={formData.mileage}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Condition */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Condition:</label>
          <input 
            type='text' 
            name='condition'
            value={formData.condition}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Fuel Type */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Fuel Type:</label>
          <input 
            type='text' 
            name='fuel_type'
            value={formData.fuel_type}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Transmission */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Transmission:</label>
          <input 
            type='text' 
            name='transmission'
            value={formData.transmission}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Color */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Color:</label>
          <input 
            type='text' 
            name='color'
            value={formData.color}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* VIN */}
        <div className='mb-4'>
          <label className='block text-gray-700'>VIN:</label>
          <input 
            type='text' 
            name='vin'
            value={formData.vin}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Description */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Description:</label>
          <textarea 
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {/* Submit Button */}
        <button 
          type='submit'
          className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
