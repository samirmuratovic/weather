const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
        trueGray: colors.trueGray,
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
