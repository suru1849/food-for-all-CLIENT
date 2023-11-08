/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // diasyUi
    "./src/**/*.{js,ts,jsx,tsx}", // diasyUi
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", //flowbite
  ],
  theme: {
    fontFamily: {
      kenia: "'Kenia', sans-serif",
      "varela-round": " 'Varela Round', sans-serif",
    },
    backgroundImage: {
      addFoodBanner: "url('/src/assets/foodBanner.jpg')",
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
