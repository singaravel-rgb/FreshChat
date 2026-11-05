'use client'

import { ReactNode } from 'react'
import { Menu, Bell, Search } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Sidebar } from './Sidebar'
import { useSidebarPreference } from '@/hooks/useSidebarPreference'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AppShell({ children, header }: { children: ReactNode; header?: ReactNode }) {
  const { collapsed, toggle } = useSidebarPreference(true)

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar collapsed={collapsed} onToggle={toggle} />
      <div className={cn('min-h-screen transition-[padding-left] duration-180 ease-out', collapsed ? 'pl-sidebar-collapsed' : 'pl-sidebar')}>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-white/90">
          <button type="button" onClick={toggle} className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 md:hidden" aria-label="Toggle navigation">
            <Menu size={18} />
          </button>
          <div className="relative hidden w-full max-w-md md:block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search conversations, customers..." className="h-8 pl-9" aria-label="Global search" />
          </div>
          <div className="ml-auto flex items-center gap-2">
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
