// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-teal-500 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white font-bold text-xl">Car Dealership</Link>
        <div>
          <Link to="/" className="text-white hover:text-gray-200 mr-4">Home</Link>
          <Link to="/cars/sort" className="text-white hover:text-gray-200 mr-4">Sort Cars</Link>
          <Link to="/add-car" className="text-white hover:text-gray-200">Add Car</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
