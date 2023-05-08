/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/routes/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("tailwind-gradient-mask-image")],
};
