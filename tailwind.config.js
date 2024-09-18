/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        accentRed: '#FF0000', 
        accentBlack: '#000000', 
      },
    },
  },
  plugins: [],
};
