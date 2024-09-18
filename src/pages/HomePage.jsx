import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [featuredCars, setFeaturedCars] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars');
        const allCars = response.data;
        
        if (allCars.length > 0) {
          setCars(allCars);

          const shuffledCars = allCars.sort(() => 0.5 - Math.random());
          const selectedFeaturedCars = shuffledCars.slice(0, 3);
          setFeaturedCars(selectedFeaturedCars);
        } else {
          setError('No cars available.');
        }
      } catch (err) {
        setError('Failed to fetch car data.');
      }
    };

    fetchCars();
  }, []);

  const showFeaturedCars = !error && featuredCars.length > 0;
  const showDemoCars = error || (cars.length > 0 && !showFeaturedCars);

  return (
    <div className='pt-16'>
      <div className="relative bg-cover bg-center py-20" style={{ backgroundImage: "url('/images/tfa.jfif')" }}>
        <div className="absolute inset-0 bg-black opacity-90"></div>
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-5xl font-bold text-accentRed mb-4">Welcome to TFA Automobiles</h1>
          <p className="text-xl text-accentBlack mb-6 text-white py-2">Explore our diverse range of vehicles and exceptional services.</p>
          <Link to="/catalogue" className="bg-accentRed text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition">
            View Our Catalogue
          </Link>
        </div>
      </div>

      <section className="py-12 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold text-accentRed mb-4">About Us</h2>
        <p className="text-lg text-accentBlack">
          At TFA Automobiles, we pride ourselves on providing top-quality vehicles and unmatched customer service.
          Our team is dedicated to ensuring you find the perfect car that meets your needs and preferences.
          Discover our selection and experience the difference with TFA Automobiles.
        </p>
      </section>

      {showFeaturedCars && (
        <section className="py-12 px-6">
          <h2 className="text-3xl font-semibold text-accentRed text-center mb-6">Featured Cars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <div key={car._id} className="border p-4 rounded-lg shadow-lg">
                <img src={car.images[0] || '/images/default-car.jpg'} alt={car.name} className="h-48 w-full object-cover mb-4" />
                <h3 className="text-xl font-bold text-accentBlack">{car.name}</h3>
                <p className="text-gray-600">{car.description}</p>
                <Link to={`/car/${car._id}`} className="text-accentRed hover:underline mt-4 block">Learn More</Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {showDemoCars && (
  <section className="py-12 px-6">
  <h2 className="text-3xl font-semibold text-accentRed text-center mb-6">Featured Cars</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="border p-4 rounded-lg shadow-lg">
      <img src="https://imgd.aeplcdn.com/370x208/n/cw/ec/139651/curvv-exterior-right-front-three-quarter.jpeg?isig=0&q=80" alt="Featured Car 1" className="h-48 w-full object-cover mb-4" />
      <h3 className="text-xl font-bold text-accentBlack">Car Model 1</h3>
      <p className="text-gray-600">Brief description of the car. Great features and price.</p>
      <Link to="/car/1" className="text-accentRed hover:underline mt-4 block">Learn More</Link>
    </div>
    <div className="border p-4 rounded-lg shadow-lg">
      <img src="https://imgd-ct.aeplcdn.com/320x200/n/cw/ec/132427/taisor-exterior-right-front-three-quarter-2.png?isig=0&q=80" alt="Featured Car 2" className="h-48 w-full object-cover mb-4" />
      <h3 className="text-xl font-bold text-accentBlack">Car Model 2</h3>
      <p className="text-gray-600">Brief description of the car. Excellent performance and value.</p>
      <Link to="/car/2" className="text-accentRed hover:underline mt-4 block">Learn More</Link>
    </div>
    <div className="border p-4 rounded-lg shadow-lg">
      <img src="https://imgd.aeplcdn.com/370x208/n/cw/ec/56265/f-pace-exterior-right-front-three-quarter-4.jpeg?isig=0" alt="Featured Car 3" className="h-48 w-full object-cover mb-4" />
      <h3 className="text-xl font-bold text-accentBlack">Car Model 3</h3>
      <p className="text-gray-600">Brief description of the car. Advanced features and style.</p>
      <Link to="/car/3" className="text-accentRed hover:underline mt-4 block">Learn More</Link>
    </div>
  </div>
</section>
      )}

      <section className="bg-accentRed text-center py-12">
  <h2 className="text-3xl font-semibold text-white mb-4">Get in Touch</h2>
  <p className="text-lg text-white mb-6">Have any questions or need assistance? Contact us today!</p>
  <a
    href="https://wa.me/2348035386391"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white text-accentRed px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition"
  >
    Contact Us
  </a>
</section>
    </div>
  );
};

export default HomePage;
