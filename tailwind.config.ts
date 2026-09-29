import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary':    'var(--color-bg-primary)',
        'bg-secondary':  'var(--color-bg-secondary)',
        surface:         'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        'text-primary':  'var(--color-text-primary)',
        'text-secondary':'var(--color-text-secondary)',
        'text-muted':    'var(--color-text-muted)',
        border:          'var(--color-border)',
        'border-subtle': 'var(--color-border-subtle)',
        accent:          'var(--color-accent)',
        'accent-hover':  'var(--color-accent-hover)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Courier New', 'monospace'],
      },
      spacing: {
        'nav': '64px',
      },
      transitionTimingFunction: {
        'expo-out':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'quart-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        statusPulse: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.35' },
        },
      },
      animation: {
        'marquee':         'marquee 45s linear infinite',
        'marquee-reverse': 'marquee-reverse 55s linear infinite',
        'statusPulse':     'statusPulse 2.5s ease-in-out infinite',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}

export default config
