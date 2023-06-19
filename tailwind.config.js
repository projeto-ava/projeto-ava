/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito Sans', 'Open Sans'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'gray-ctr-1': 'var(--gray-ctr-1)',
        'gray-ctr-2': 'var(--gray-ctr-2)',
        'gray-ctr-3': 'var(--gray-ctr-3)',
        'gray-ctr-4': 'var(--gray-ctr-4)',
        'primary': {
          light: '#A4BCFD',
          DEFAULT: '#6172F3',
          dark: '#444CE7',
        },
      },
    },
  },
  plugins: [],
}
