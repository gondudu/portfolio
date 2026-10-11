import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import ConditionalShell from '@/components/layout/ConditionalShell'

const archivo = Archivo({
  weight: ['400', '500', '600'],
  style: ['normal'],
  variable: '--font-archivo',
  display: 'swap',
  subsets: ['latin'],
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
    <html lang="en" className={archivo.variable}>
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
