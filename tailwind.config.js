/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'color-1':'#113946',
        'color-2':'#BCA37F',
        'color-3':'#EAD7BB',
        'color-4':'#FFF2D8',
      },
      boxShadow: {
        '1': '0px 0px 14px -1px rgba(0,0,0,0.23)',
      }
    },
  },
  plugins: [],
}
