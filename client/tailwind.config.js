/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      fontFamily: {
        bellota: ['Bellota', 'cursive'],
      },
      colors : {
        graySearch: "#3D3D3D"
      }
    },
  },
  plugins: [],
}

