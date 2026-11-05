'use client'

import { useState } from 'react'
import { Search, Filter, Clock, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils/cn'

interface InboxItemProps {
  conversation: any
  selected: boolean
  onClick: () => void
}

function InboxItem({ conversation, selected, onClick }: InboxItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'ai_handling': return 'bg-purple-100 text-purple-800'
      case 'queued_human': return 'bg-yellow-100 text-yellow-800'
      case 'assigned': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-indigo-100 text-indigo-800'
      case 'resolved': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors',
        selected && 'bg-blue-50 border-l-2 border-l-blue-600'
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={16} />
          </div>
          <div>
            <p className="text-sm font-medium">Customer</p>
            <p className="text-xs text-gray-500">customer@example.com</p>
          </div>
        </div>
        <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getStatusColor(conversation.status))}>
          {conversation.status.replace('_', ' ')}
        </span>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2 mb-2">Latest message preview...</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Clock size={12} />
          2 min ago
        </span>
        {conversation.ai_handled && (
          <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">AI</span>
        )}
      </div>
    </div>
  )
}

export function InboxList() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const conversations = [
    { id: '1', status: 'ai_handling', ai_handled: true },
    { id: '2', status: 'queued_human', ai_handled: false },
    { id: '3', status: 'assigned', ai_handled: false },
  ]

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter size={16} />
          </Button>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="last_activity">Last activity</option>
          <option value="oldest_unanswered">Oldest unanswered</option>
          <option value="priority">Priority</option>
          <option value="sla_deadline">SLA deadline</option>
        </select>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <InboxItem
            key={conv.id}
            conversation={conv}
            selected={selectedId === conv.id}
            onClick={() => setSelectedId(conv.id)}
          />
        ))}
      </div>
    </Card>
  )
}
