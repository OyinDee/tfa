import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 1000, 
  easing: 'ease-in-out', 
  once: false, 
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
