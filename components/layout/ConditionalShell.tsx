'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isConsole = pathname === '/'

  return (
    <>
      {!isConsole && <Header />}
      <main className={isConsole ? 'contents' : ''}>{children}</main>
      {!isConsole && <Footer />}
    </>
  )
}
