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
        gold: {
          50: '#FDFCF7',
          100: '#FAF7EC',
          200: '#F4ECD0',
          300: '#ECDFA9',
          400: '#E1CD77',
          500: '#D4AF37', // Luxury Accent Gold
          600: '#B89225',
          700: '#92711A',
          800: '#6E5215',
          900: '#48350F',
        },
        obsidian: {
          950: '#070709',
          900: '#0C0D12',
          850: '#11121A',
          800: '#161822',
          700: '#202230',
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
