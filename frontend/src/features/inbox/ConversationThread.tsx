'use client'

import { useState } from 'react'
import { Send, Paperclip, Smile, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils/cn'

export function ConversationThread() {
  const [message, setMessage] = useState('')
  const [mode, setMode] = useState<'public' | 'internal'>('public')

  const messages = [
    { id: '1', sender_type: 'customer', content: 'Hello, I need help with my order', created_at: '10:30 AM' },
    { id: '2', sender_type: 'ai', content: 'Hi! I can help you with that. Can you provide your order number?', created_at: '10:31 AM' },
  ]

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold">Conversation</h2>
        <p className="text-sm text-gray-500">#CONV-001</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex',
              msg.sender_type === 'customer' ? 'justify-start' : 'justify-end'
            )}
          >
            <div
              className={cn(
                'max-w-[70%] rounded-lg p-3',
                msg.sender_type === 'customer' && 'bg-gray-100',
                msg.sender_type === 'agent' && 'bg-blue-600 text-white',
                msg.sender_type === 'ai' && 'bg-purple-100 text-purple-900'
              )}
            >
              <p className="text-sm">{msg.content}</p>
              <p className={cn('text-xs mt-1', msg.sender_type === 'agent' ? 'text-blue-100' : 'text-gray-500')}>
                {msg.created_at}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setMode('public')}
            className={cn(
              'px-3 py-1 text-sm rounded-lg',
              mode === 'public' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            Public Reply
          </button>
          <button
            onClick={() => setMode('internal')}
            className={cn(
              'px-3 py-1 text-sm rounded-lg',
              mode === 'internal' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            Internal Note
          </button>
        </div>
        <div className="flex gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={mode === 'public' ? 'Type your reply...' : 'Add internal note...'}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-1">
            <Button variant="ghost" size="sm"><Paperclip size={16} /></Button>
            <Button variant="ghost" size="sm"><Smile size={16} /></Button>
            <Button variant="ghost" size="sm"><MessageSquare size={16} /></Button>
          </div>
          <Button size="sm">
            <Send size={16} className="mr-1" />
            Send
          </Button>
        </div>
      </div>
    </Card>
  )
}
