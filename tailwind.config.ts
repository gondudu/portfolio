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
        // Console / 8-bit theme
        'console-bg': '#0a0e0a',
        'console-panel': '#050a05',
        'console-border': '#1a2f1a',
        'console-phosphor': '#33ff00',
        'console-phosphor-dim': '#1a8a00',
        'console-phosphor-bright': '#66ff33',
        'console-amber': '#ff8c00',
        'console-red': '#ff2200',
      },
      fontFamily: {
        sans: ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
        console: ['var(--font-vt323)', 'monospace'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '60px',
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
