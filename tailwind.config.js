// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation:{
        "bottomslider": "bottomslider 6s linear forwards",
        "moveleft": "moveleft 1s linear forwards",
      },
      keyframes: {
        bottomslider:{
          "100%":{
            width:0
          }
        },
        moveleft:{
          "100%":{
            transform: "translateX(0)"
          }
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

