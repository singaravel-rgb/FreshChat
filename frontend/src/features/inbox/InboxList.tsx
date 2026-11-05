'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils/cn'

type Tab = 'my' | 'unassigned' | 'all'

export type ConversationRow = {
  id: string
  customer: string
  email: string
  preview: string
  status: 'new' | 'ai_handling' | 'queued_human' | 'assigned' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  channel: string
  unread?: number
  tags: string[]
  ai: boolean
  time: string
  sla?: string
}

const statusMeta: Record<ConversationRow['status'], { label: string; variant: 'brand' | 'purple' | 'warning' | 'success' | 'muted' }> = {
  new: { label: 'New', variant: 'brand' },
  ai_handling: { label: 'AI', variant: 'purple' },
  queued_human: { label: 'Queued', variant: 'warning' },
  assigned: { label: 'Assigned', variant: 'success' },
  in_progress: { label: 'In progress', variant: 'brand' },
  resolved: { label: 'Resolved', variant: 'muted' },
  closed: { label: 'Closed', variant: 'muted' },
}

export function InboxList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: ConversationRow[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const [tab, setTab] = useState<Tab>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return conversations.filter((c) => {
      if (tab === 'unassigned' && c.status !== 'queued_human' && c.status !== 'new') return false
      if (tab === 'my' && c.status === 'queued_human') return false
      if (!q) return true
      return c.customer.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    })
  }, [conversations, tab, search])

  return (
    <section className="flex h-full min-w-0 flex-col border-r border-slate-200 bg-white" aria-label="Conversation list">
      <div className="border-b border-slate-200 p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Conversations</h2>
          <Button variant="ghost" size="icon" aria-label="Filters"><SlidersHorizontal size={15} /></Button>
        </div>
        <div className="mb-2 grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-1">
          {([['my', 'My'], ['unassigned', 'Unassigned'], ['all', 'All']] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn('rounded-md px-2 py-1.5 text-xs font-medium transition-colors', tab === key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900')}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search conversations" className="h-8 pl-8" />
        </div>
      </div>

      <div className="app-scrollbar min-h-0 flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-500">No conversations match your filters.</div>
        ) : (
          <ul>
            {filtered.map((c) => {
              const selected = selectedId === c.id
              const status = statusMeta[c.status]
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(c.id)}
                    className={cn(
                      'flex w-full gap-3 border-b border-slate-100 px-3 py-3 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500',
                      selected && 'bg-brand-50/60'
                    )}
                    aria-current={selected ? 'true' : undefined}
                  >
                    <Avatar name={c.customer} size="sm" className="mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className={cn('truncate text-sm font-medium', unread(c) ? 'text-slate-900' : 'text-slate-800')}>{c.customer}</p>
                        {c.unread ? <span className="h-2 w-2 shrink-0 rounded-full bg-brand-600" aria-label="Unread" /> : null}
                        <span className="ml-auto shrink-0 text-[11px] text-slate-500">{c.time}</span>
                      </div>
                      <p className="truncate text-xs text-slate-600">{c.preview}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-1">
                        <Badge variant={status.variant}>{status.label}</Badge>
                        <span className="text-[11px] text-slate-400">{c.channel}</span>
                        {c.priority !== 'normal' && <Badge variant={c.priority === 'urgent' ? 'danger' : 'warning'}>{c.priority}</Badge>}
                        {c.tags.slice(0, 1).map((t) => <Badge key={t} variant="muted">{t}</Badge>)}
                        {c.sla && <span className="ml-auto text-[11px] font-medium text-amber-600">{c.sla}</span>}
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

function unread(c: ConversationRow) {
  return (c.unread ?? 0) > 0
}
