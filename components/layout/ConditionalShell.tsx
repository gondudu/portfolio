'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import CursorEffect from '@/components/shared/CursorEffect'

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isConsole = pathname === '/' || pathname.startsWith('/projects/')

  return (
    <>
      <CursorEffect />
      {!isConsole && <Header />}
      <main className={isConsole ? 'contents' : ''}>{children}</main>
      {!isConsole && <Footer />}
    </>
  )
}
