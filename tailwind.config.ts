import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e8fff4',
          100: '#c7f7e1',
          200: '#9eeec8',
          300: '#6de1ac',
          400: '#3fd491',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        surface: '#0b1220',
        panel: 'rgba(255,255,255,0.04)',
        border: 'rgba(255,255,255,0.08)',
        text: {
          primary: '#f8fafc',
          muted: '#94a3b8'
        },
        status: {
          info: '#60a5fa',
          success: '#22c55e',
          warning: '#fbbf24',
          danger: '#f87171'
        }
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem'
      },
      borderRadius: {
        lgx: '18px',
        xlx: '24px'
      },
      boxShadow: {
        panel: '0 24px 48px rgba(0,0,0,0.35)'
      }
    }
  },
  plugins: []
};

export default config;
