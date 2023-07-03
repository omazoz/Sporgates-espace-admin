/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        c_blue: "#3385F1",
        c_blueDark: "#30324B", // Primary
        c_blueLight1: "#EFFAFF", // Primary
        c_blueLight2: "#D7E4EA",
        c_orange: "#FB7A1E", // Primary
        c_orangeLight: "#FFF5EE",
        c_white: "#FCF7FF", // Primary
        c_black: "#141414", // Primary
        c_green: "#23BC74",
        c_red: "#FF2020",
        c_gray: "#DEDEDE",
      }
    },
  },
  plugins: [],
});
