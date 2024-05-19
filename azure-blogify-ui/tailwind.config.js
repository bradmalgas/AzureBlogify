/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        babyblue: '#20C4FF'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
