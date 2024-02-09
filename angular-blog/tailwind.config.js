const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
import { themes } from './src/themes';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html,analog}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes,
  },
};
