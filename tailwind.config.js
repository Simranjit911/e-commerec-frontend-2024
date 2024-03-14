/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom color variable here
        primaryBlue: '#1e40af', // Example color code
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
