/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#E87512',
          light: '#F58E38',
          dark: '#C94F08',
          deep: '#B23F05'
        },
        gold: {
          DEFAULT: '#C89B3C',
          light: '#E6C66A',
          pale: '#F4E7BE',
          dark: '#A47B22'
        },
        cream: {
          DEFAULT: '#FFF8E8',
          light: '#FFFDF5',
          soft: '#FBF5E5'
        },
        maroon: {
          DEFAULT: '#641E12',
          dark: '#4D140A',
          deep: '#3B1D0B'
        },
        charcoal: '#2B2118',
        'vedic-text': '#2B2118'
      },
      fontFamily: {
        serif: ['"Noto Serif Devanagari"', 'serif'],
        sans: ['"Noto Sans Devanagari"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(43, 33, 24, 0.06)',
        xs: '0 1px 3px 0 rgba(43, 33, 24, 0.1)',
        'gold-sm': '0 2px 8px -2px rgba(200, 155, 60, 0.25)',
        'gold-md': '0 6px 20px -4px rgba(200, 155, 60, 0.3)',
        'gold-lg': '0 12px 32px -6px rgba(200, 155, 60, 0.35)',
        'saffron-md': '0 8px 24px -4px rgba(232, 117, 18, 0.4)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.85' },
        },
      },
      animation: {
        'pulse-slow': 'pulseSlow 2.4s ease-in-out infinite',
        fadeIn: 'fadeIn 0.18s ease-out both',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E6C66A 0%, #C89B3C 50%, #A47B22 100%)',
        'saffron-gradient': 'linear-gradient(135deg, #F58E38 0%, #E87512 50%, #C94F08 100%)',
        'maroon-gradient': 'linear-gradient(135deg, #641E12 0%, #4D140A 60%, #3B1D0B 100%)',
      }
    },
  },
  plugins: [],
}
