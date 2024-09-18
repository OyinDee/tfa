import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

// Utility function to format the price with commas
const formatPrice = (price) => {
  return price.toLocaleString('en-US');
};

const CataloguePage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/cars')
      .then(response => {
        setCars(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
        setError('Error fetching car data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const conversionRate = 1600;

  return (
    <div className="p-6 bg-gray-100 min-h-screen pt-28">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {cars.map(car => (
          <div key={car._id} className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="relative">
              {car.images.length > 0 ? (
                <img src={car.images[0]} alt={car.name} className="w-full h-48 object-cover mb-4" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
              )}
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-xl font-semibold text-accentBlack mb-2">{car.name}</h3>
              <p className="text-gray-600 mb-4">{car.description}</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600 font-semibold">₦{formatPrice(car.price)}</p>
                <p className="text-accentRed font-semibold">${formatPrice((car.price / conversionRate).toFixed(2))}</p>
              </div>
              <a href={`/car/${car._id}`} className="block text-center text-accentRed font-semibold hover:underline py-2">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CataloguePage;
