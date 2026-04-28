/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#03045e',
        'dark-input': '#0077b6',
        'dark-border': '#00b4d8',
        'text-gray': '#90e0ef',
        'blue-primary': '#00b4d8',
        'blue-dark': '#0077b6',
      },
      backgroundColor: {
        'dark-bg': '#03045e',
        'dark-input': '#0077b6',
      },
    },
  },
  plugins: [],
}
