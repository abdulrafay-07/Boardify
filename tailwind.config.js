/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "primary": ['Cabin Sketch', 'sans-serif'],
        "secondary": ['Dekko', 'sans-serif']
      }
    },
  },
  plugins: [],
}

