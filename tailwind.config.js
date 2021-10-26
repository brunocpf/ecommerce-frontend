const colors = require('tailwindcss/colors');
const { lightBlue, ..._colors } = colors;

module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Poppins', 'serif'],
    },
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ..._colors,
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      backgroundOpacity: ['active'],
      borderWidth: ['hover', 'active'],
      ring: ['hover', 'focus', 'active'],
      textColor: ['active'],
      opacity: ['active', 'disabled'],
      outline: ['active'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
