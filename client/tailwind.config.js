/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#0F0F11',
        'card-dark': '#1A1A1D',
        'accent-brand': '#FF3B30',
        'accent-glow': '#FF4500',
        'text-light': '#F5F5F5',
      },
      fontFamily: {
        sans: ['Poppins', 'Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
