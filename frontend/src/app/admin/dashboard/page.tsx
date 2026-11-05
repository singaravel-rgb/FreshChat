'use client'

import { AppShell } from '@/components/layout/AppShell'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Bot, Sliders, Globe, Bell, Shield, BookOpen, Settings } from 'lucide-react'

const sections = [
  { title: 'General Settings', desc: 'Organization, branding, and defaults.', icon: Settings },
  { title: 'Users & Permissions', desc: 'Roles, approvals, and access control.', icon: Users },
  { title: 'Teams & Assignment', desc: 'Routing rules and workload limits.', icon: Sliders },
  { title: 'AI Configuration', desc: 'AI-first behavior, knowledge, and kill switch.', icon: Bot, badge: 'Admin' },
  { title: 'Channels', desc: 'Website chat, widget, and future channels.', icon: Globe },
  { title: 'Help Center & FAQs', desc: 'Articles, categories, and chat-from-FAQ.', icon: BookOpen },
  { title: 'Notifications', desc: 'Agent alerts and escalation events.', icon: Bell },
  { title: 'Security & Integrations', desc: 'Audit, API keys, and integrations.', icon: Shield },
]

export default function AdminDashboardPage() {
  return (
    <AppShell header={<Badge variant="muted">Admin</Badge>}>
      <div className="app-scrollbar h-full overflow-y-auto bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">Admin Settings</h1>
            <p className="mt-1 text-sm text-slate-500">Configure the platform. Changes should be backed by admin APIs and permissions.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sections.map((s) => (
              <Card key={s.title} className="cursor-pointer p-4 transition-colors hover:border-slate-300 hover:bg-white">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-lg bg-slate-100 p-2 text-slate-700"><s.icon size={18} /></span>
                  {s.badge && <Badge variant="purple">{s.badge}</Badge>}
                </div>
                <h2 className="mt-3 text-sm font-semibold text-slate-900">{s.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
