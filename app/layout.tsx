import type { Metadata } from 'next'
import { Archivo, Spline_Sans_Mono } from 'next/font/google'
import './globals.css'
import ConditionalShell from '@/components/layout/ConditionalShell'

// Variable Archivo with the width axis exposed, so the poster name can go
// condensed (font-stretch 62%) and the labels semi-condensed.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

// The "mono" label voice — 11px, uppercase, tracked, tabular figures.
const splineMono = Spline_Sans_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Eduardo Nogueira — Product Designer',
  description:
    'Product designer in Berlin. Design systems, platform architecture, and the tools that let teams stop rebuilding and start shipping.',
  keywords: ['Product Designer', 'Design Systems', 'UX Designer', 'Berlin', 'Portfolio'],
  authors: [{ name: 'Eduardo Nogueira' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${splineMono.variable}`}>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <noscript>
          <div className="page-x py-section-sm text-small text-muted">
            This portfolio uses JavaScript for navigation. Core content is available without it.
          </div>
        </noscript>
        <ConditionalShell>
          <div id="main-content">{children}</div>
        </ConditionalShell>
      </body>
    </html>
  )
}
