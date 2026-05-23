/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#f5d78e',
          400: '#e8c46a',
          500: '#C9A84C',
          600: '#a8883d',
          700: '#8a6d2f',
        },
        silver: {
          300: '#e8e8e8',
          400: '#d0d0d0',
          500: '#b8b8b8',
          600: '#9a9a9a',
        },
        obsidian: {
          900: '#050505',
          800: '#0a0a0a',
          700: '#111111',
          600: '#1a1a1a',
          500: '#222222',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'molecule': 'molecule 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(201,168,76,0.3)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(201,168,76,0.6)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        molecule: {
          '0%': { transform: 'rotate(0deg) translateX(0px)' },
          '100%': { transform: 'rotate(360deg) translateX(0px)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #f5d78e 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #111111 100%)',
      },
    },
  },
  plugins: [],
};
