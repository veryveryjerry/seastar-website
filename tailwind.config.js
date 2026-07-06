/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#00408C',
        'offwhite': '#F2EEE9',
        'cyan': '#96ADD6',
        'yellow': '#F9B8AF',
        'orange': '#dc5c22',
        'lavender': '#F2D7D3'
      },
      fontFamily: {
        'sans': ['"Plus Jakarta Sans"', 'sans-serif'],
        'outfit': ['"Outfit"', 'sans-serif'],
        'helvetica': ['Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
