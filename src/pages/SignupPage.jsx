import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; 


const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // console.log({ username, password })
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { username, password });
      navigate('/login'); 
    } catch (error) {
      setError('Failed to sign up. Please try again.');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button type="submit" className="w-full bg-accentRed text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
