// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',   // 👈 Important!
    './layouts/**/*.{js,ts,jsx,tsx}',      // 👈 If you're using a layouts folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
