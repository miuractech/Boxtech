const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{js,jsx,ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
    // screens: {
    //   'sm': { 'max': '768px' },
    //   'md': { 'max': '344px' },
    //   'sl': { 'max': '1178px', 'min': '768px' },
    //   'mr': { 'max': '840px', 'min': '768px' }
    // }
  },
  plugins: [],
};
