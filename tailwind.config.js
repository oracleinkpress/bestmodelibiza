/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        copper: {
          50: '#FDF8F5',
          100: '#F9EEE7',
          200: '#F1D8CC',
          300: '#E4BCAB',
          400: '#D5967E',
          500: '#C87D55', // Authentic Luxury Copper
          600: '#B26239',
          700: '#944C27',
          800: '#793C1E',
          900: '#4D2411',
          950: '#2A1208',
        },
        obsidian: {
          950: '#040406',
          900: '#08080C',
          850: '#0E0E14',
          800: '#14141D',
          700: '#1D1D2B',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
