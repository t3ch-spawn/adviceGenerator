/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors :{
          mainBg : 'hsl(218, 23%, 16%)',
          cardBg: "hsl(217, 19%, 24%)",
          lineCol: "hsl(217, 19%, 38%)",
          fontCol: " hsl(193, 38%, 86%)",
          cyan : "hsl(150, 100%, 66%)",
      },
      fontFamily:{
        main : 'Manrope'
      },
    },
  },
  plugins: [],
}

