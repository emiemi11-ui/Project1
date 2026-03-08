import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#03050A',
        ink2: '#080C14',
        ink3: '#0D1220',
        ink4: '#111827',
        panel: '#0B0F1C',
        dark: '#0A0A0F',
        dark2: '#12121A',
        dark3: '#1A1A2E',
        cyan: '#00D4FF',
        signal: '#00E5A0',
        cold: '#3054D8',
        cold2: '#4267E8',
        amber: '#F0A000',
        red: '#E83050',
        violet: '#7C5CFC',
        ice: '#E8EEFF',
        ice2: '#B4C3F0',
        ice3: '#7A90C8',
      },
      fontFamily: {
        syne: ['system-ui', '-apple-system', 'sans-serif'],
        dm: ['system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'scan': 'scan 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        scan: {
          '0%': { top: '-5%' },
          '100%': { top: '105%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px rgba(0,229,160,0.3)' },
          '100%': { textShadow: '0 0 30px rgba(0,229,160,0.6), 0 0 60px rgba(0,229,160,0.3)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
