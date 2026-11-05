'use client'

import { useEffect, useRef, useState } from 'react'
import { Paperclip, Smile, Send, Sparkles, Lock, MoreHorizontal, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils/cn'

export type ThreadMessage = {
  id: string
  sender: 'customer' | 'agent' | 'ai' | 'system'
  content: string
  time: string
  internal?: boolean
  status?: 'sent' | 'delivered' | 'read'
}

export function ConversationThread({
  conversationId,
  customerName,
}: {
  conversationId: string | null
  customerName?: string
}) {
  const [mode, setMode] = useState<'reply' | 'internal'>('reply')
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<ThreadMessage[]>([
    { id: '1', sender: 'customer', content: 'Hi, my order #4832 has not arrived yet. Can you help?', time: '10:24 AM' },
    { id: '2', sender: 'ai', content: 'I can help check order #4832. I’m reviewing the latest delivery status now.', time: '10:24 AM', status: 'delivered' },
    { id: '3', sender: 'system', content: 'Conversation assigned to Agent User.', time: '10:25 AM' },
    { id: '4', sender: 'agent', content: 'Thanks for reaching out. I’ve confirmed the shipment is delayed and I can offer options.', time: '10:27 AM', status: 'read' },
  ])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [conversationId, messages.length])

  if (!conversationId) {
    return (
      <section className="flex h-full flex-1 items-center justify-center bg-slate-50/60 text-center">
        <div>
          <p className="text-sm font-medium text-slate-700">Select a conversation</p>
          <p className="mt-1 text-sm text-slate-500">Choose a thread from the list to view messages and reply.</p>
        </div>
      </section>
    )
  }

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: 'agent',
        content: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        internal: mode === 'internal',
        status: 'sent',
      },
    ])
    setDraft('')
  }

  return (
    <section className="flex h-full min-w-0 flex-1 flex-col bg-slate-50/40" aria-label="Conversation workspace">
      <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={customerName || 'Customer'} size="sm" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-sm font-semibold text-slate-900">{customerName || 'Customer'}</h2>
              <span className="h-2 w-2 rounded-full bg-emerald-500" title="Online" />
              <span className="text-xs text-slate-400">#{conversationId}</span>
            </div>
            <p className="text-xs text-slate-500">Website Chat · SLA <span className="font-medium text-amber-600">12m left</span></p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm"><CheckCircle2 size={14} />Resolve</Button>
          <Button variant="ghost" size="icon" aria-label="More actions"><MoreHorizontal size={16} /></Button>
        </div>
      </header>

      <div className="app-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {messages.map((m) => (
            <MessageRow key={m.id} message={m} />
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white p-3">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-center gap-1">
            <button type="button" onClick={() => setMode('reply')} className={cn('rounded-md px-2.5 py-1.5 text-xs font-medium', mode === 'reply' ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100')}>Reply</button>
            <button type="button" onClick={() => setMode('internal')} className={cn('inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium', mode === 'internal' ? 'bg-amber-50 text-amber-800' : 'text-slate-600 hover:bg-slate-100')}><Lock size={12} />Internal note</button>
          </div>
          <div className={cn('rounded-xl border bg-white shadow-sm', mode === 'internal' ? 'border-amber-200 bg-amber-50/30' : 'border-slate-300')}>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send() }}
              placeholder={mode === 'internal' ? 'Add a private note visible only to your team…' : 'Type a reply to the customer…'}
              rows={3}
              className="block w-full resize-none rounded-t-xl bg-transparent px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              aria-label={mode === 'internal' ? 'Internal note' : 'Reply message'}
            />
            <div className="flex items-center justify-between border-t border-slate-200/80 px-2 py-1.5">
              <div className="flex items-center gap-0.5">
                <Button variant="ghost" size="icon" type="button" aria-label="Attach file"><Paperclip size={15} /></Button>
                <Button variant="ghost" size="icon" type="button" aria-label="Emoji"><Smile size={15} /></Button>
                <Button variant="ghost" size="sm" type="button" className="text-violet-700 hover:bg-violet-50"><Sparkles size={14} />AI assist</Button>
              </div>
              <Button size="sm" type="button" onClick={send} disabled={!draft.trim()}><Send size={14} />Send</Button>
            </div>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400">Ctrl+Enter to send. AI responses and internal notes are clearly labeled.</p>
        </div>
      </div>
    </section>
  )
}

function MessageRow({ message }: { message: ThreadMessage }) {
  if (message.sender === 'system') {
    return <div className="flex justify-center"><p className="rounded-full bg-slate-200/70 px-3 py-1 text-[11px] text-slate-600">{message.content}</p></div>
  }
  const outbound = message.sender === 'agent' || message.sender === 'ai'
  return (
    <div className={cn('flex', outbound ? 'justify-end' : 'justify-start')}>
      <div className={cn('max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-sm', outbound ? 'rounded-br-md' : 'rounded-bl-md',
        message.internal ? 'border border-amber-200 bg-amber-50 text-amber-950' :
        message.sender === 'customer' ? 'border border-slate-200 bg-white text-slate-900' :
        message.sender === 'ai' ? 'border border-violet-200 bg-violet-50 text-slate-900' :
        'bg-brand-600 text-white'
      )}>
        {outbound && !message.internal && (
          <div className="mb-1 flex items-center gap-1.5">
            <Badge variant={message.sender === 'ai' ? 'purple' : 'brand'} className={cn(message.sender === 'agent' && 'bg-white/15 text-white')}>{message.sender === 'ai' ? 'AI' : 'Agent'}</Badge>
          </div>
        )}
        {message.internal && <div className="mb-1"><Badge variant="warning">Internal note</Badge></div>}
        <p className="whitespace-pre-wrap text-sm leading-5">{message.content}</p>
        <div className={cn('mt-1 flex items-center justify-end gap-1 text-[11px]', message.sender === 'agent' && !message.internal ? 'text-brand-100' : 'text-slate-500')}>
          <span>{message.time}</span>
          {message.status && message.sender === 'agent' && <span>· {message.status}</span>}
        </div>
      </div>
    </div>
  )
}
