/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'website-gradient': 'linear-gradient(to bottom, #101212, #08201D)',
      },
    },
  },
  plugins: [],
}