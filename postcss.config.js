const purgecss = require('@fullhuman/postcss-purgecss')({
   content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],

   // Include any special characters you're using in this regular expression
   defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
})

module.exports = {
   plugins: [
      require('tailwindcss'),
      require('postcss-nested'),
      require('autoprefixer'),
      ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
   ],
}
