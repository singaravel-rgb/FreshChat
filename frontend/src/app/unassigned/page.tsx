'use client'

import { useMemo, useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { InboxList, type ConversationRow } from '@/features/inbox/InboxList'
import { ConversationThread } from '@/features/inbox/ConversationThread'
import { CustomerPanel } from '@/features/inbox/CustomerPanel'
import { Badge } from '@/components/ui/badge'

const conversations: ConversationRow[] = [
  { id: '4832', customer: 'John Doe', email: 'john.doe@example.com', preview: 'Hi, my order #4832 has not arrived yet. Can you help?', status: 'queued_human', priority: 'high', channel: 'Web Chat', unread: 1, tags: ['Delivery'], ai: true, time: '2m', sla: '12m' },
  { id: '4828', customer: 'New Visitor', email: 'visitor@example.com', preview: 'I need help choosing a plan.', status: 'new', priority: 'normal', channel: 'Web Chat', tags: ['Sales'], ai: true, time: '3m', sla: '15m' },
]

export default function UnassignedPage() {
  const [selectedId, setSelectedId] = useState<string | null>(conversations[0]?.id ?? null)
  const [detailsCollapsed, setDetailsCollapsed] = useState(false)
  const selected = useMemo(() => conversations.find((c) => c.id === selectedId) ?? null, [selectedId])

  return (
    <AppShell header={<><Badge variant="warning">Unassigned</Badge><span className="hidden text-sm text-slate-500 sm:inline">{conversations.length} waiting</span></>}>
      <div className="flex h-full min-h-0 bg-white">
        <div className="hidden w-[340px] shrink-0 lg:block"><InboxList conversations={conversations} selectedId={selectedId} onSelect={setSelectedId} /></div>
        <ConversationThread conversationId={selectedId} customerName={selected?.customer} />
        <CustomerPanel collapsed={detailsCollapsed} onToggle={() => setDetailsCollapsed((v) => !v)} />
      </div>
    </AppShell>
  )
}
