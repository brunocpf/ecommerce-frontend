const colors = require('tailwindcss/colors');
const { lightBlue, ..._colors } = colors;

module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Merriweather Sans', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
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
      borderWidth: ['hover'],
      ring: ['hover', 'focus', 'active'],
      textColor: ['active'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
