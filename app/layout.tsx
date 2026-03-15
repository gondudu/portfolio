import type { Metadata } from 'next'
import { VT323, IBM_Plex_Mono, Jost } from 'next/font/google'
import './globals.css'
import ConditionalShell from '@/components/layout/ConditionalShell'

const vt323 = VT323({
  weight: '400',
  variable: '--font-vt323',
  display: 'swap',
  subsets: ['latin'],
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  subsets: ['latin'],
})

const jost = Jost({
  weight: ['400', '700'],
  style: ['normal'],
  variable: '--font-jost',
  display: 'swap',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Eduardo Nogueira | Product Designer',
  description: 'Portfolio of Eduardo Nogueira - Product Designer crafting meaningful digital experiences',
  keywords: ['Product Designer', 'UX Designer', 'UI Designer', 'Portfolio'],
  authors: [{ name: 'Eduardo Nogueira' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${vt323.variable} ${ibmPlexMono.variable} ${jost.variable}`}>
      <body>
        <a href="#main-content" className="skip-to-content">SKIP TO CONTENT</a>
        <noscript>
          <div style={{ position: 'fixed', inset: 0, background: '#ffffff', color: '#030303', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', textAlign: 'center', padding: '24px' }}>
            Please enable JavaScript to view this portfolio.
          </div>
        </noscript>
        <ConditionalShell>
          <div id="main-content">{children}</div>
        </ConditionalShell>
      </body>
    </html>
  )
}
