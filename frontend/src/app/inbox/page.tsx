'use client'

import { InboxList } from '@/features/inbox/InboxList'
import { ConversationThread } from '@/features/inbox/ConversationThread'
import { CustomerPanel } from '@/features/inbox/CustomerPanel'
import { Bell, User, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function InboxPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Support Inbox</h1>
            <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg">
              <option>All Conversations</option>
              <option>Open</option>
              <option>Queue</option>
              <option>Pending</option>
              <option>AI Chats</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Bell size={18} />
            </Button>
            <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
              <span className="text-sm">Agent</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </header>
      <div className="flex h-[calc(100vh-57px)] gap-0">
        <div className="w-80 flex-shrink-0">
          <InboxList />
        </div>
        <div className="flex-1">
          <ConversationThread />
        </div>
        <div className="w-80 flex-shrink-0">
          <CustomerPanel />
        </div>
      </div>
    </div>
  )
}
