import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { VT323, IBM_Plex_Mono, Jost } from 'next/font/google'
import './globals.css'
import ConditionalShell from '@/components/layout/ConditionalShell'
import PasswordGate from '@/components/shared/PasswordGate'

const workSans = localFont({
  src: [
    {
      path: './fonts/WorkSans-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: './fonts/WorkSans-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-work-sans',
  display: 'swap',
})

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
    <html lang="en" className={`${workSans.variable} ${vt323.variable} ${ibmPlexMono.variable} ${jost.variable}`}>
      <body>
        <a href="#main-content" className="skip-to-content">SKIP TO CONTENT</a>
        <noscript>
          <div style={{ position: 'fixed', inset: 0, background: '#020100', color: '#a87000', fontFamily: 'monospace', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', textAlign: 'center', padding: '24px' }}>
            MU-TH-UR 6000 requires JavaScript to operate. Please enable JavaScript in your browser.
          </div>
        </noscript>
        <PasswordGate>
          <ConditionalShell>
            <div id="main-content">{children}</div>
          </ConditionalShell>
        </PasswordGate>
      </body>
    </html>
  )
}
