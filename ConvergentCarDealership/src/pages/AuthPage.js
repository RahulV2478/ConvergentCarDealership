// src/pages/AuthPage.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // Ensure this is your correct firebase import
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const AuthPage = () => {
  const history = useHistory();

  // Switch between "login" and "signup"
  const [isSignup, setIsSignup] = useState(false);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Toggle between Signup and Login
  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setErrorMsg('');
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isSignup) {
        // Create new user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log('Signup success:', userCredential.user);
      } else {
        // Log in existing user
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log('Login success:', userCredential.user);
      }
      // After successful login or signup, redirect to "/home"
      history.push('/home');
    } catch (err) {
      console.error('Auth error:', err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* 
      Adds a gradient background from top-left to bottom-right.
      You can change these color classes to your liking. 
    */
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center">
      {/* Auth Card */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isSignup ? 'Create an Account' : 'Log In'}
        </h1>
        
        {/* Error Message */}
        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 text-center rounded">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
          >
            {loading
              ? 'Processing...'
              : isSignup
              ? 'Sign Up'
              : 'Log In'}
          </button>
        </form>

        {/* Toggle Signup/Login */}
        <div className="text-center mt-6">
          {isSignup ? (
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={toggleMode}
                className="text-blue-600 hover:underline font-semibold"
              >
                Log In
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={toggleMode}
                className="text-blue-600 hover:underline font-semibold"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
