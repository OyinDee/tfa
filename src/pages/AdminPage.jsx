import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
  const [carDetails, setCarDetails] = useState({
    name: '',
    description: '',
    price: '',
    year: '',
    model: '',
    mileage: '',
  });
  const [images, setImages] = useState([]);
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.user) {
          fetchCars();
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const fetchCars = async () => {
    try {
      const response = await axios.get('/api/cars');
      setCars(response.data);
    } catch (err) {
      toast.error('Failed to fetch cars.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const fileReaders = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then(imageUrls => {
      setImages(imageUrls);
    }).catch(err => {
      toast.error('Failed to read image files.');
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingCar) {
        await axios.put(`/api/cars/${editingCar._id}`, {
          ...carDetails,
          images: images.length ? images : editingCar.images,
        });
        toast.success('Car updated successfully!');
      } else {
        await axios.post('/api/cars', {
          ...carDetails,
          images: images.length ? images : [],
          timeout: 30000,
        });
        toast.success('Car added successfully!');
      }

      setCarDetails({
        name: '',
        description: '',
        price: '',
        year: '',
        model: '',
        mileage: '',
      });
      setImages([]);
      setEditingCar(null);
      fetchCars();
    } catch (err) {
      toast.error('An error occurred while saving the car.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (car) => {
    setCarDetails({
      name: car.name,
      description: car.description,
      price: car.price,
      year: car.year,
      model: car.model,
      mileage: car.mileage,
    });
    setImages(car.images || []);
    setEditingCar(car);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await axios.delete(`/api/cars/${id}`);
        setCars(cars.filter(car => car._id !== id));
        toast.success('Car deleted successfully!');
      } catch (err) {
        toast.error('Failed to delete car.');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen pt-24">
      <h1 className="text-3xl font-bold text-accentRed mb-6">{editingCar ? 'Edit Car' : 'Add New Car'}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        {['name', 'description', 'price', 'year', 'model', 'mileage'].map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block text-gray-700 mb-2 capitalize">
              {field.replace(/^\w/, (c) => c.toUpperCase())}
            </label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              id={field}
              name={field}
              value={carDetails[field]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        ))}
        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-700 mb-2">Car Images</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            multiple
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-accentRed text-white px-6 py-3 rounded-lg text-lg font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Saving...' : editingCar ? 'Update Car' : 'Add Car'}
        </button>
      </form>
      
      <h2 className="text-2xl font-bold text-accentRed mt-12 mb-6">Existing Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{car.name}</h3>
            <p>{car.description}</p>
            <p>Price: ${car.price}</p>
            <p>Year: {car.year}</p>
            <p>Model: {car.model}</p>
            <p>Mileage: {car.mileage}</p>
            {car.images.length > 0 && (
              <div className="mt-2">
                {car.images.map((img, index) => (
                  <img key={index} src={img} alt={`Car image ${index + 1}`} className="w-full h-48 object-cover mt-2" />
                ))}
              </div>
            )}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEdit(car)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(car._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
