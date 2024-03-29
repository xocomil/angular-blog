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
    extend: {
      gridTemplateRows: {
        'article-home':
          'minmax(var(--article-home-min), 33%) repeat(2, minmax(var(--article-home-min), 1fr))',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes,
  },
};
