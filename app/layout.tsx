import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { VT323 } from 'next/font/google'
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
    <html lang="en" className={`${workSans.variable} ${vt323.variable}`}>
      <body>
        <PasswordGate>
          <ConditionalShell>{children}</ConditionalShell>
        </PasswordGate>
      </body>
    </html>
  )
}
