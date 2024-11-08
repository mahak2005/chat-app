// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  // Include all pages
    './components/**/*.{js,ts,jsx,tsx}', // Include all components
    './app/**/*.{js,ts,jsx,tsx}', // If you use the app directory in Next.js 13 or higher
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
