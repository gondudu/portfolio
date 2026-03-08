import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'wide': '600px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#0061FF',
        accent1: '#FFD02F',
        accent2: '#FF6B6B',
        accent3: '#7B68EE',
        accent4: '#00D9B1',
        background: '#FFFFFF',
        foreground: '#1E1E1E',
        // Console / 8-bit theme — amber phosphor
        'console-bg': '#080400',
        'console-panel': '#020100',
        'console-border': '#2a1800',
        'console-phosphor': '#e8a000',
        'console-phosphor-dim': '#a87000',
        'console-phosphor-bright': '#ffc93c',
        'console-amber': '#e8a000',
        'console-red': '#ff2200',
      },
      fontFamily: {
        sans: ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
        console: ['var(--font-vt323)', 'monospace'],
      },
      fontSize: {
        xs: '16px',
        sm: '20px',
        base: '24px',
        lg: '36px',
        xl: '48px',
        '2xl': '64px',
        '3xl': '96px',
        '4xl': '120px',
      },
      spacing: {
        'section': '120px',
        'section-md': '80px',
        'section-sm': '60px',
        'container': '120px',
        'container-md': '60px',
        'container-sm': '32px',
      },
    },
  },
  plugins: [],
}
export default config
