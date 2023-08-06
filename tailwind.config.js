/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4B4B4C",
        secondary: "#676767",
        tertiary: "#808080",
        quaternary: "#AFAFAF",
      },
    },
  },
  plugins: [],
};
