/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'neue': ['PPNeueMachina', 'sans-serif']
      }
    },
  },
  plugins: [],
}