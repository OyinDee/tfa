import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const formatPrice = (price) => {
  return price.toLocaleString('en-US');
};

const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const conversionRate = 1600; 

  useEffect(() => {
    axios.get(`/api/cars/${id}`)
      .then(response => {
        setCar(response.data);
        // console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching car details:', error);
      });
  }, [id]);

  if (!car) return <p>Loading...</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };


  const priceInUSD = (car.price / conversionRate).toFixed(2);

  const whatsappMessage = `I need to make enquiries about this car: ${window.location.href}`;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-semibold mb-6">{car.name}</h2>
      <div className="mb-6">
        <Slider {...settings}>
          {car.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={car.name} className="w-full h-96 object-cover rounded-lg shadow-lg" />
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:mr-6 mb-6 md:mb-0">
          <p className="text-gray-700 mb-4">{car.description}</p>
          <p className="text-accentRed font-semibold text-2xl mb-4">
            ₦{formatPrice(car.price)} / ${formatPrice(priceInUSD)}
          </p>
          <p className="text-gray-800 mb-2"><strong>Year:</strong> {car.year}</p>
          <p className="text-gray-800 mb-2"><strong>Model:</strong> {car.model}</p>
          <p className="text-gray-800 mb-2"><strong>Mileage:</strong> {formatPrice(car.mileage)} miles</p>
        </div>
      </div>

      <a 
        href={`https://wa.me/2348035386391?text=${encodeURIComponent(whatsappMessage)}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block text-center bg-accentRed text-white font-bold py-3 px-6 rounded-lg hover:bg-accentRed transition mt-6"
      >
        Proceed to Buy
      </a>
    </div>
  );
};

export default CarDetailPage;
