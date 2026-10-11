import type { Config } from 'tailwindcss'

/**
 * Swiss / International Typographic Style.
 *
 * The system is deliberately small: one typeface, five colours, a 12-column
 * grid, and 1px rules. Structure comes from alignment and hairlines — never
 * from shadows, radii, or fills.
 */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        paper: '#0A0A0A',
        ink: '#FAFAF8',
        muted: '#9A9A96',
        rule: '#2A2A28',
        accent: '#FF4438',
        // Aliases kept so `text-foreground` / `bg-background` stay meaningful.
        background: '#0A0A0A',
        foreground: '#FAFAF8',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Named scale. Tailwind's numeric defaults (text-xs … text-9xl) are
        // left intact underneath; prefer these tokens in new work.
        label: ['11px', { lineHeight: '1.2', letterSpacing: '0.14em', fontWeight: '600' }],
        small: ['15px', { lineHeight: '1.5', letterSpacing: '0' }],
        body: ['18px', { lineHeight: '1.6', letterSpacing: '0' }],
        lead: ['22px', { lineHeight: '1.45', letterSpacing: '-0.01em' }],
        title: ['28px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        display: ['clamp(36px, 4.5vw, 56px)', { lineHeight: '1.06', letterSpacing: '-0.025em', fontWeight: '600' }],
        'display-xl': ['clamp(56px, 7vw, 96px)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '600' }],
      },
      spacing: {
        // 8px base. Section rhythm.
        section: '96px',
        'section-md': '64px',
        'section-sm': '32px',
        gutter: '24px',
      },
      maxWidth: {
        page: '1440px',
        measure: '68ch', // comfortable reading line length for body copy
      },
      borderColor: {
        DEFAULT: '#2A2A28',
      },
      transitionTimingFunction: {
        swiss: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
}
export default config
