const { default: plugin } = require('tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brown":{
          100: "#ECE0D1",
          300: "#DBC1AC",
          600: "#967259",
          900: "#634832"
        }
      },
      boxShadow: {
        "normal": "0px 1px 10px 0px #0000000D"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      fontFamily: {
        "Dana" : "Dana",
        "DanaDemiBold" : "Dana DemiBold",
        "DanaMedium" : "Dana Medium",
        "MorabbaLight" : "Morabba Light",
        "MorabbaMedium" : "Morabba Medium",
        "MorabbaBold" : "Morabba Bold"
      },
      letterSpacing:{
        "tightest" : "-0.065em"
      },
      spacing:{
        "4.5": "1.125rem",
        "30": "7.5rem",
        "25": "6.25rem",
        "50":"12.5rem"
      },
      container:{
        center: true,
        padding:{
          DEFAULT: "1rem",
          lg: "0.625rem"
        }
      },
      backgroundImage:{
        "home-mobile": "url('../images/cup-coffee-laptop-books-black-background-top-view-with-copy-space_641503-328565_Object\ Removal.jpg')",
        "home-desktop": "URL('../images/cup-coffee-laptop-books-black-background-top-view-with-copy-space_641503-328565_Object\ Removal.jpg')"
      }
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    }
  },
  plugins: [
    require('flowbite/plugin'),
    function({addVariant}){
      addVariant("child", "&>*");
      addVariant("child-hover", "&>*:hover");
    }
  ],

}

