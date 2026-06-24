/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        galaxy: {
          bg: '#0a0a0f',
          card: '#111118',
          'card-alt': '#16162a',
          text: '#f8fafc',
          muted: '#94a3b8',
          primary: '#38bdf8',
          secondary: '#a855f7',
          orbit: 'rgba(255,255,255,0.12)',
          nebula: 'rgba(168,85,247,0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 120s linear infinite',
        'spin-medium': 'spin 90s linear infinite',
        'spin-fast': 'spin 18s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'comet': 'cometFly 15s linear infinite',
        'meteor': 'meteorFall 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 40px rgba(255,165,0,0.4)' },
          '50%': { boxShadow: '0 0 80px rgba(255,165,0,0.8)' },
        },
        cometFly: {
          '0%': { transform: 'translate(-200%, -100%) rotate(-45deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translate(300%, 200%) rotate(-45deg)', opacity: '0' },
        },
        meteorFall: {
          '0%': { transform: 'translate(100px, -100px) rotate(-45deg)', opacity: '1' },
          '100%': { transform: 'translate(-100px, 300px) rotate(-45deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
