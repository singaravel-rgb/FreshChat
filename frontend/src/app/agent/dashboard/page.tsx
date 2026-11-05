'use client'

import { Inbox, MessageSquare, Users, Clock, Bot, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const metrics = [
  { label: 'Active conversations', value: '24', sub: 'Across all agents', icon: Inbox },
  { label: 'Pending / Queue', value: '8', sub: '5 unassigned', icon: Users },
  { label: 'AI resolved', value: '18', sub: 'Last 24 hours', icon: Bot },
  { label: 'Avg response', value: '2m 18s', sub: 'First response', icon: Clock },
  { label: 'SLA compliance', value: '94%', sub: '2 at risk', icon: CheckCircle2 },
  { label: 'Resolution time', value: '15m', sub: 'Median', icon: TrendingUp },
]

export default function AgentDashboardPage() {
  return (
    <AppShell
      header={
        <Link href="/inbox"><Button size="sm">Open Inbox</Button></Link>
      }
    >
      <div className="app-scrollbar h-full overflow-y-auto bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">Operational overview for your support workspace.</p>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {metrics.map((m) => (
              <Card key={m.label} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{m.label}</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">{m.value}</p>
                    <p className="mt-1 text-xs text-slate-500">{m.sub}</p>
                  </div>
                  <span className="rounded-lg bg-slate-100 p-2 text-slate-600"><m.icon size={18} /></span>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Needs attention</h2>
                <Badge variant="warning">3 items</Badge>
              </div>
              <ul className="space-y-2">
                {[
                  ['SLA at risk', 'Conversation #4829 has 4 minutes remaining.', 'urgent'],
                  ['Unassigned queue', '5 conversations waiting for an available agent.', 'queue'],
                  ['Escalated by AI', 'Billing dispute requires human review.', 'ai'],
                ].map(([title, desc, kind]) => (
                  <li key={title} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3">
                    <AlertTriangle size={16} className={kind === 'urgent' ? 'mt-0.5 text-amber-600' : 'mt-0.5 text-slate-400'} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-900">{title}</p>
                      <p className="text-sm text-slate-500">{desc}</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-4">
              <h2 className="mb-3 text-sm font-semibold text-slate-900">Agent availability</h2>
              <div className="space-y-3">
                {[
                  ['You', 'Available', '3 active / 5 max', 'success'],
                  ['Alex Chen', 'Busy', '5 active / 5 max', 'warning'],
                  ['Sam Rivera', 'Available', '2 active / 5 max', 'success'],
                ].map(([name, status, load, tone]) => (
                  <div key={name} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{name}</p>
                      <p className="text-xs text-slate-500">{load}</p>
                    </div>
                    <Badge variant={tone === 'success' ? 'success' : 'warning'}>{status}</Badge>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">Workload-based routing assigns new conversations to eligible available agents.</p>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
