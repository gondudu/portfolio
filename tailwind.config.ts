import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0061FF',
        accent1: '#FFD02F',
        accent2: '#FF6B6B',
        accent3: '#7B68EE',
        accent4: '#00D9B1',
        background: '#FFFFFF',
        foreground: '#1E1E1E',
      },
      fontFamily: {
        sans: ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
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
