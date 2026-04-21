import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,tsx,ts,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        bg:     'hsl(var(--bg))',
        bg2:    'hsl(var(--bg2))',
        fg:     'hsl(var(--fg))',
        fg2:    'hsl(var(--fg2))',
        fg3:    'hsl(var(--fg3))',
        border: 'hsl(var(--border))',
      },
    },
  },
  plugins: [],
}

export default config
