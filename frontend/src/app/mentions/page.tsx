'use client'

import { AppShell } from '@/components/layout/AppShell'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AtSign } from 'lucide-react'

export default function MentionsPage() {
  return (
    <AppShell header={<Badge variant="brand">Mentions</Badge>}>
      <div className="app-scrollbar h-full overflow-y-auto bg-slate-50 p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">Mentions</h1>
          <p className="mt-1 text-sm text-slate-500">Internal notes and collaboration mentions directed to you.</p>
          <Card className="mt-5 p-8 text-center">
            <span className="mx-auto inline-flex rounded-lg bg-slate-100 p-2 text-slate-600"><AtSign size={18} /></span>
            <p className="mt-3 text-sm font-medium text-slate-900">No mentions yet</p>
            <p className="mt-1 text-sm text-slate-500">When teammates mention you in internal notes, they’ll appear here. This view will connect to backend notifications/mentions APIs.</p>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
