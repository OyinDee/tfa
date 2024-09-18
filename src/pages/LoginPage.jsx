import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    //   console.log({ username, password })
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
        const response = await axios.post('/api/auth/login', { username, password });
        localStorage.setItem('token', response.data.token);
      navigate('/admin'); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); 
      } else {
        setError('Invalid username or password'); 
      }
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
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
        <button
          type="submit"
          className="w-full bg-accentRed text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Not an admin? <a href="/catalogue" className="text-accentRed hover:underline">Go to Catalogue</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
