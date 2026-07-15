/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f4ecd8',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        garamond: ['"EB Garamond"', 'serif'],
        archivo: ['"Archivo"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
