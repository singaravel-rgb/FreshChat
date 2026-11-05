'use client'

import { AppShell } from '@/components/layout/AppShell'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function AgentWorkspacePage() {
  return (
    <AppShell header={<Badge variant="success">Available</Badge>}>
      <div className="app-scrollbar h-full overflow-y-auto bg-slate-50 p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-slate-900">Agent Workspace</h1>
              <p className="mt-1 text-sm text-slate-500">Manage your queue, availability, and assigned conversations.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Set Busy</Button>
              <Button size="sm">Go to Inbox</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4"><p className="text-sm text-slate-500">Assigned to you</p><p className="mt-1 text-2xl font-semibold">3</p></Card>
            <Card className="p-4"><p className="text-sm text-slate-500">Capacity</p><p className="mt-1 text-2xl font-semibold">3 / 5</p></Card>
            <Card className="p-4"><p className="text-sm text-slate-500">Avg response</p><p className="mt-1 text-2xl font-semibold">2m 18s</p></Card>
          </div>
          <Card className="mt-4 p-4">
            <h2 className="text-sm font-semibold text-slate-900">Personal queue</h2>
            <p className="mt-2 text-sm text-slate-500">Assigned conversations appear in your Inbox. This workspace will show your activity, status controls, and performance as backend data is connected.</p>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
