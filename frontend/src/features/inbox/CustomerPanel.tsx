'use client'

import { Mail, Phone, Building2, MapPin, Tag, Clock, PanelRightClose, PanelRightOpen, UserCog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'

export function CustomerPanel({
  collapsed,
  onToggle,
}: {
  collapsed: boolean
  onToggle: () => void
}) {
  if (collapsed) {
    return (
      <div className="flex h-full w-11 shrink-0 flex-col items-center border-l border-slate-200 bg-white py-2">
        <Button variant="ghost" size="icon" onClick={onToggle} aria-label="Show customer details" title="Show details">
          <PanelRightOpen size={16} />
        </Button>
      </div>
    )
  }

  return (
    <aside className="flex h-full w-[320px] shrink-0 flex-col border-l border-slate-200 bg-white" aria-label="Customer details">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">Details</h2>
        <Button variant="ghost" size="icon" onClick={onToggle} aria-label="Hide customer details">
          <PanelRightClose size={16} />
        </Button>
      </div>
      <div className="app-scrollbar min-h-0 flex-1 overflow-y-auto">
        <div className="border-b border-slate-200 p-4">
          <div className="flex items-start gap-3">
            <Avatar name="John Doe" size="lg" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">John Doe</p>
              <p className="text-xs text-slate-500">Customer · Acme Inc.</p>
              <div className="mt-1.5"><Badge variant="success">Online</Badge></div>
            </div>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-slate-600"><Mail size={14} className="text-slate-400" /><dd className="truncate">john.doe@example.com</dd></div>
            <div className="flex items-center gap-2 text-slate-600"><Phone size={14} className="text-slate-400" /><dd>+1 234 567 8900</dd></div>
            <div className="flex items-center gap-2 text-slate-600"><Building2 size={14} className="text-slate-400" /><dd>Acme Inc.</dd></div>
            <div className="flex items-center gap-2 text-slate-600"><MapPin size={14} className="text-slate-400" /><dd>San Francisco, CA</dd></div>
          </dl>
        </div>

        <Section title="Conversation">
          <Row label="Status" value={<Badge variant="warning">Queued</Badge>} />
          <Row label="Priority" value={<Badge variant="default">Normal</Badge>} />
          <Row label="Channel" value="Website Chat" />
          <Row label="Assigned" value={<span className="inline-flex items-center gap-1"><UserCog size={13} />Agent User</span>} />
          <Row label="Team" value="Support" />
          <Row label="AI handled" value="In progress" />
          <Row label="SLA" value={<span className="inline-flex items-center gap-1 text-amber-700"><Clock size={13} />12m left</span>} />
        </Section>

        <Section title="Tags">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="brand">Order Issue</Badge>
            <Badge variant="muted">Delivery</Badge>
          </div>
          <Button variant="outline" size="sm" className="mt-2 w-full"><Tag size={14} />Add tag</Button>
        </Section>

        <Section title="Notes">
          <p className="text-sm text-slate-500">No custom fields configured yet. Admin can add fields in Settings.</p>
        </Section>
      </div>
    </aside>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-slate-200 p-4">
      <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-900">{value}</dd>
    </div>
  )
}
