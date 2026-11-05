'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, Headset } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { navGroups } from './nav-config'
import { Tooltip } from '@/components/ui/tooltip'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200 bg-white transition-[width] duration-180 ease-out',
        collapsed ? 'w-sidebar-collapsed' : 'w-sidebar'
      )}
      aria-label="Primary navigation"
    >
      <div className={cn('flex h-14 items-center border-b border-slate-200', collapsed ? 'justify-center px-2' : 'justify-between px-3')}>
        <Link href="/inbox" className="flex items-center gap-2 overflow-hidden" aria-label="Home">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Headset size={16} />
          </span>
          {!collapsed && <span className="truncate text-sm font-semibold text-slate-900">Support Desk</span>}
        </Link>
        {!collapsed && (
          <button type="button" onClick={onToggle} className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700" aria-label="Collapse sidebar">
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      <nav className="app-scrollbar flex-1 overflow-y-auto py-3">
        {navGroups.map((group) => (
          <div key={group.title} className={cn('mb-4', collapsed ? 'px-2' : 'px-3')}>
            {!collapsed && <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{group.title}</p>}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href) && item.href !== '/admin/dashboard' && item.href !== '/inbox' ? false : pathname === item.href)
                const isActive = pathname === item.href
                const Icon = item.icon
                const link = (
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex items-center rounded-lg text-sm font-medium transition-colors',
                      collapsed ? 'justify-center px-0 py-2.5' : 'gap-2.5 px-2 py-2',
                      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={18} className={cn('shrink-0', isActive ? 'text-brand-600' : 'text-slate-500 group-hover:text-slate-700')} />
                    {!collapsed && (
                      <>
                        <span className="truncate">{item.label}</span>
                        {item.badge && <Badge variant="muted" className="ml-auto">{item.badge}</Badge>}
                      </>
                    )}
                  </Link>
                )
                return (
                  <li key={`${group.title}-${item.label}`}>
                    <Tooltip label={item.label} disabled={!collapsed}>{link}</Tooltip>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className={cn('border-t border-slate-200 p-2', collapsed ? 'flex flex-col items-center gap-2' : '')}>
        {collapsed ? (
          <>
            <Tooltip label="Expand sidebar">
              <button type="button" onClick={onToggle} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Expand sidebar">
                <ChevronRight size={16} />
              </button>
            </Tooltip>
            <Tooltip label="Agent profile">
              <button type="button" className="rounded-full ring-offset-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" aria-label="Profile">
                <Avatar name="Agent User" size="sm" />
              </button>
            </Tooltip>
          </>
        ) : (
          <div className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-slate-50">
            <Avatar name="Agent User" size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">Agent User</p>
              <p className="truncate text-xs text-slate-500">Online</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
