'use client'

import { useMemo, useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { InboxList, type ConversationRow } from '@/features/inbox/InboxList'
import { ConversationThread } from '@/features/inbox/ConversationThread'
import { CustomerPanel } from '@/features/inbox/CustomerPanel'
import { Badge } from '@/components/ui/badge'

const conversations: ConversationRow[] = [
  { id: '4832', customer: 'John Doe', email: 'john.doe@example.com', preview: 'Hi, my order #4832 has not arrived yet. Can you help?', status: 'queued_human', priority: 'high', channel: 'Web Chat', unread: 1, tags: ['Delivery'], ai: true, time: '2m', sla: '12m' },
  { id: '4831', customer: 'Sarah Smith', email: 'sarah@acme.com', preview: 'I need to update billing details for my account.', status: 'ai_handling', priority: 'normal', channel: 'Web Chat', tags: ['Billing'], ai: true, time: '8m', sla: '28m' },
  { id: '4830', customer: 'Mike Johnson', email: 'mike@example.com', preview: 'Thanks, that resolved my issue.', status: 'assigned', priority: 'normal', channel: 'Web Chat', tags: [], ai: false, time: '25m' },
  { id: '4829', customer: 'Priya Patel', email: 'priya@example.com', preview: 'Can I change my subscription plan?', status: 'in_progress', priority: 'urgent', channel: 'Web Chat', tags: ['Plan'], ai: true, time: '1h', sla: '4m' },
]

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<string | null>(conversations[0]?.id ?? null)
  const [detailsCollapsed, setDetailsCollapsed] = useState(false)

  const selected = useMemo(() => conversations.find((c) => c.id === selectedId) ?? null, [selectedId])

  return (
    <AppShell
      header={
        <div className="hidden items-center gap-2 sm:flex">
          <Badge variant="brand">Inbox</Badge>
          <span className="text-sm text-slate-500">{conversations.length} open</span>
        </div>
      }
    >
      <div className="flex h-full min-h-0 bg-white">
        <div className="w-[340px] shrink-0">
          <InboxList conversations={conversations} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <ConversationThread conversationId={selectedId} customerName={selected?.customer} />
        <CustomerPanel collapsed={detailsCollapsed} onToggle={() => setDetailsCollapsed((v) => !v)} />
      </div>
    </AppShell>
  )
}
