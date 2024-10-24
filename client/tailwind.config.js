/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        // Add any custom colors here
      },
      backgroundImage: {
        'gameBg': "url('https://res.cloudinary.com/avhixorin/image/upload/v1729693239/pexels-neosiam-4498792_lbyqs5.jpg')", 
        "grad": 'linear-gradient(to bottom left, hsl(222, 84%, 60%), hsl(164, 79%, 71%))'
      },
    },
  },
  
  plugins: [require("tailwindcss-animate")],
}
