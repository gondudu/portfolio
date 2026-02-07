import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
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
    <html lang="en" className={workSans.variable}>
      <body>
        <PasswordGate>
          <Header />
          <main>{children}</main>
          <Footer />
        </PasswordGate>
      </body>
    </html>
  )
}
