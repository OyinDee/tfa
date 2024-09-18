import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import CarDetailPage from './pages/CarDetailPage';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoutes';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
          <Route path="/admin" element={<PrivateRoute element={<AdminPage />} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Routes>
      </div>
    </Router>
  );
}


export default App;
