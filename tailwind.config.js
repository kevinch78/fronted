 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        'purple-light': '#E6D6FE',
        'purple-dark': '#B888F8',
        'purple-lightplus': '#F1E9FE',
        'cloufPurple': "#7B61FF",
        'cloufLavender': "#E6DFFF",
        'cloufAccent': "#1FB6FF"
      },
      backgroundImage: {
        'cloufit-gradient': 'linear-gradient(135deg, #00d4ff, #8e2de2)',
      },
    },
  },
  plugins: [],
}