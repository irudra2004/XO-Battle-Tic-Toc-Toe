/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#060913',
          900: '#0a0f1d',
          850: '#0f172a',
          800: '#162038',
          700: '#1e2942',
        },
        neon: {
          cyan: '#00f0ff',
          pink: '#ff1493',
          purple: '#b026ff',
          blue: '#2563eb',
          green: '#10b981',
          amber: '#f59e0b',
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.45), 0 0 30px rgba(0, 240, 255, 0.2)',
        'neon-cyan-sm': '0 0 8px rgba(0, 240, 255, 0.5)',
        'neon-purple': '0 0 15px rgba(176, 38, 255, 0.45), 0 0 30px rgba(176, 38, 255, 0.2)',
        'neon-purple-sm': '0 0 8px rgba(176, 38, 255, 0.5)',
        'neon-pink': '0 0 15px rgba(255, 20, 147, 0.45), 0 0 30px rgba(255, 20, 147, 0.2)',
        'neon-green': '0 0 20px rgba(16, 185, 129, 0.55), 0 0 35px rgba(16, 185, 129, 0.25)',
        'neon-amber': '0 0 20px rgba(245, 158, 11, 0.55), 0 0 35px rgba(245, 158, 11, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 12px rgba(0, 240, 255, 0.7))' },
          '50%': { opacity: '0.7', filter: 'drop-shadow(0 0 4px rgba(0, 240, 255, 0.3))' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        winPulse: {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.05)', filter: 'brightness(1.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-in': 'scaleIn 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'win-pulse': 'winPulse 1.4s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
