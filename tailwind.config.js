/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#020617", // deep navy
          800: "#0f172a",
        },
        blue: {
          500: "#3b82f6", // electric blue
        },
        cyan: {
          500: "#06b6d4",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
