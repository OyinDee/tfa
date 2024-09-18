import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 py-2">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-accentRed text-2xl font-bold">TFA Automobiles</Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-accentBlack hover:text-accentRed transition">Home</Link>
          <Link to="/catalogue" className="text-accentBlack hover:text-accentRed transition">Catalogue</Link>
          {/* <Link to="/contact" className="text-accentBlack hover:text-accentRed transition">Contact</Link> */}
          <Link to="/admin" className="text-accentBlack hover:text-accentRed transition">Admin</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-accentRed focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-primary mt-2">
          <Link to="/" onClick={closeMenu} className="block text-accentBlack hover:text-accentRed transition px-4 py-2">Home</Link>
          <Link to="/catalogue" onClick={closeMenu} className="block text-accentBlack hover:text-accentRed transition px-4 py-2">Catalogue</Link>
          {/* <Link to="/contact" onClick={closeMenu} className="block text-accentBlack hover:text-accentRed transition px-4 py-2">Contact</Link> */}
          <Link to="/admin" onClick={closeMenu} className="block text-accentBlack hover:text-accentRed transition px-4 py-2">Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
