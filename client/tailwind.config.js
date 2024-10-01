/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#121212', // Dark background
          lighter: '#1E1E1E', // Slightly lighter dark shade
          accent: '#BB86FC',  // Accent color
          text: '#E0E0E0',    // Text color in dark mode
        },
        light: {
          DEFAULT: '#F3F4F6', // Light background
          text: '#1F2937',    // Text color in light mode
        },
      },
    },
  },
  plugins: [],
};
