'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import CursorEffect from '@/components/shared/CursorEffect'

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <>
      <CursorEffect />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
