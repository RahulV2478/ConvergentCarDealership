// src/components/Navbar.js
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  const history = useHistory();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        history.push('/');
      })
      .catch((err) => {
        console.error('Logout error:', err);
      });
  };

  return (
    <nav className="bg-blue-900 px-6 py-3 text-white flex items-center justify-between">
      {/* Left Section: Logo/Title */}
      <div className="font-bold text-xl">
        <Link to="/home" className="hover:underline">
          Convergent Car Dealership
        </Link>
      </div>

      {/* Right Section: Nav Links & Logout */}
      <div className="flex items-center">
        <Link to="/home" className="hover:underline mr-6">
          Home
        </Link>
        <Link to="/add-car" className="hover:underline mr-6">
          Add Car
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
