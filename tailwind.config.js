const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      gray: colors.trueGray
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/typography'),require('@tailwindcss/forms')],
  purge: {
    // Filenames to scan for classes
    content: [
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.ts',
      './src/**/*.tsx',
      './public/index.html',
    ],
    // Options passed to PurgeCSS
    options: {
      // Whitelist specific selectors by name
      // safelist: [],
    },
  },
}
