/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          gold: '#f59e0b',
          amber: '#d97706',
          saffron: '#ea580c',
          crimson: '#991b1b',
          deep: '#060913',
          surface: '#0d1424',
          card: '#080d1a',
          border: '#334155'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Noto Sans Tamil', 'serif', 'Georgia'],
        sans: ['Inter', 'Noto Sans Tamil', 'system-ui', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
