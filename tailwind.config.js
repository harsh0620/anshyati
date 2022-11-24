/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        redg: "#e04235",
        blueg: "#1a73e8",
        bluegg: "#2476f7",
        greeng: "#34a853",
        yellowg: "#fbbc05",
        orangeg: "#FF8C00",
      },
      screens: {
        xs: "328px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
