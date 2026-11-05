import Link from 'next/link'
import { Inbox, LayoutDashboard, Settings, HelpCircle, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const links = [
  { href: '/inbox', title: 'Agent Inbox', desc: 'Three-column workspace for conversations, replies, and customer context.', icon: Inbox },
  { href: '/agent/dashboard', title: 'Dashboard', desc: 'Operational metrics, SLA, and attention queue.', icon: LayoutDashboard },
  { href: '/agent/workspace', title: 'Agent Workspace', desc: 'Availability, capacity, and personal queue.', icon: Bot },
  { href: '/admin/dashboard', title: 'Admin Settings', desc: 'Users, AI configuration, channels, and security.', icon: Settings },
  { href: '/help', title: 'Help Center', desc: 'Customer-facing FAQs and chat entry point.', icon: HelpCircle },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-medium text-brand-600">AI-first customer support platform</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Support operations workspace</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">Professional agent inbox, AI-assisted workflows, routing, and admin controls. Select an area to continue.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <Card key={l.href} className="p-5 transition-colors hover:border-slate-300">
              <span className="inline-flex rounded-lg bg-slate-100 p-2 text-slate-700"><l.icon size={18} /></span>
              <h2 className="mt-3 text-sm font-semibold text-slate-900">{l.title}</h2>
              <p className="mt-1 text-sm text-slate-500">{l.desc}</p>
              <Link href={l.href} className="mt-4 inline-block"><Button size="sm" variant="outline">Open</Button></Link>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
