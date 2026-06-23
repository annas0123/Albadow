/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mercury-blue': '#5266eb',
        'ghost-blue': '#cdddff',
        'deep-space': '#171721',
        'midnight-slate': '#1e1e2a',
        'graphite': '#272735',
        'lead': '#70707d',
        'starlight': '#ededf3',
        'silver': '#c3c3cc',
        'pure-white': '#ffffff',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'pill': '32px',
      },
      spacing: {
        'section': '80px',
      },
    },
  },
  plugins: [],
}
