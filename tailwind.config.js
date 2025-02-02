/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily : {
        head : ["HeadFont", "sans-serif"],
        body : ["BodyFont", "inter", "sans-serif"]
      },
      colors : {
        gray : {
          100 : "#eeeeef",
          200 : "#e6e9ed",
          600 : "#95989c",
          700 : "#374151",
          800 : "#1f2937",
          900 : "#111827"
        },
        purple : {
          200 : "#d9ddee",
          500 : "#9492db",
          600 : "#7164c0"
        }
      }
    },
  },
  plugins: [],
}