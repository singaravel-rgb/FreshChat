'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Menu, Bell, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Sidebar } from './Sidebar'
import { useSidebarPreference } from '@/hooks/useSidebarPreference'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AppShell({ children, header }: { children: ReactNode; header?: ReactNode }) {
  const { collapsed, toggle } = useSidebarPreference(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-40 md:block">
        <Sidebar collapsed={collapsed} onToggle={toggle} />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button type="button" className="absolute inset-0 bg-slate-900/40" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] shadow-xl">
            <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} onNavigate={() => setMobileOpen(false)} className="w-full" />
          </div>
        </div>
      )}

      <div className={cn('min-h-screen transition-[padding-left] duration-180 ease-out md:pl-sidebar-collapsed', !collapsed && 'md:pl-sidebar')}>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-white/90 sm:px-4">
          <button type="button" onClick={() => setMobileOpen(true)} className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 md:hidden" aria-label="Open navigation">
            <Menu size={18} />
          </button>
          <div className="relative hidden w-full max-w-md md:block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search conversations, customers..." className="h-8 pl-9" aria-label="Global search" />
          </div>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {header}
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell size={17} />
            </Button>
          </div>
        </header>
        <main className="h-[calc(100vh-3.5rem)] overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
