/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        daw: {
          bg: '#020408',
          panel: '#0B0F1A',
          border: '#1F2937',
          header: '#0D1117',
          sidebar: '#080B12',
        },
        accent: {
          cyan: '#22D3EE',
          emerald: '#10B981',
          purple: '#8B5CF6',
          orange: '#F59E0B',
          red: '#EF4444',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
