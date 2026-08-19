/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1C2321',
        cream: '#FFFDF8',
        putty: '#EFEAE0',
        pine: {
          DEFAULT: '#2F6D5B',
          dark: '#1F4A3E',
          light: '#4C8B77',
        },
        amber: {
          DEFAULT: '#E8A33D',
          dark: '#C4841F',
        },
        sky: '#4A6FA5',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        card: '20px',
      },
    },
  },
  plugins: [],
};
