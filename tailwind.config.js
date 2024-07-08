/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Kanit', 'sans-serif'],
      serif: ['Lora', 'serif'],
    },
    extend: {
      backgroundImage: {
        'base-grad': 'linear-gradient(#243949 25%, #517fa4 75%)',
        'card-grad': 'linear-gradient(-226deg, #7198af 20%, #93a5cf 80%)',
      },
      colors: {
        light: '#f8f8f8',
        dark: '#191919',
        'blue-1000': '#101051',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
