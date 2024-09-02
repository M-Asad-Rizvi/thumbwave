/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        "dark-bg": "#171C2F",
        "dark-bg-variant": "#1E213A",
        "light-text": "#BEC2D3",
        "button-bg": "#2E71E5",
        "button-dark-bg": "#2D66C4",
        "button-restricted-bg": "#ECEEF4",
        "heading-text": "#EDEEF3",
        "light-border": "#4F5678",
        "lightish-text": "#A7ADC5",
      },
    },
  },
  plugins: [],
};
