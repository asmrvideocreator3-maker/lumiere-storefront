import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lunara: {
          rose: '#C4637A',
          'rose-dark': '#A84E63',
          blush: '#F5D0DC',
          gold: '#C9A96E',
          cream: '#FAF7F4',
          charcoal: '#2D2D2D',
          muted: '#7A7A7A',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.4s ease-in-out infinite',
        marquee: 'marquee 22s linear infinite',
        'marquee-slow': 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
