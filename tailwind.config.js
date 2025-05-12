 /** @type {import('tailwindcss').Config} */
 export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  
  theme: {
    extend: {
      colors:{
        'pulrple-light': '#E6D6FE', // Agregar el color personalizado
        'purple-dark': '#B888F8', // Agregar el color personalizado
        'purple-lightplus':'#F1E9FE'


      }
    },
  },
  plugins: [],
}