/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  'node_modules/daisyui/dist/**/*.js',
  'node_modules/react-daisyui/dist/**/*.js',
  'node_modules/flowbite-react/lib/esm/**/*.js',
  "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"),require('flowbite/plugin')],
}

