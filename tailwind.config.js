/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        olive: { DEFAULT: '#5C6B2E', light: '#7A8F3A', dark: '#3D4A1E', muted: '#F2F4EC' },
        sand: '#F7F3ED',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
