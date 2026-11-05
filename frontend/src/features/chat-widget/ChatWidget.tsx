'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils/cn'

type Msg = { id: string; sender: 'user' | 'ai' | 'agent'; content: string; time: string }

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [min, setMin] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([
    { id: '1', sender: 'ai', content: 'Hi! I can help with common questions. Ask for a human agent anytime.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages((p) => [...p, { id: String(Date.now()), sender: 'user', content: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setInput('')
    setTimeout(() => setMessages((p) => [...p, { id: String(Date.now() + 1), sender: 'ai', content: 'Thanks — I’m reviewing that now. If needed, I can connect you with a human agent.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]), 700)
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2" aria-label="Open support chat">
        <MessageCircle size={22} />
      </button>
    )
  }

  return (
    <div className={cn('fixed bottom-5 right-5 z-50 flex w-[360px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl', min ? 'h-14' : 'h-[520px]')} role="dialog" aria-label="Support chat">
      <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <MessageCircle size={18} />
          <div>
            <p className="text-sm font-semibold">Support</p>
            <p className="text-[11px] text-slate-300">AI-first · Human handoff available</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button type="button" onClick={() => setMin((v) => !v)} className="rounded p-1 hover:bg-white/10" aria-label={min ? 'Expand chat' : 'Minimize chat'}><Minimize2 size={15} /></button>
          <button type="button" onClick={() => setOpen(false)} className="rounded p-1 hover:bg-white/10" aria-label="Close chat"><X size={15} /></button>
        </div>
      </div>
      {!min && (
        <>
          <div className="app-scrollbar flex-1 space-y-3 overflow-y-auto bg-slate-50 p-3">
            {messages.map((m) => (
              <div key={m.id} className={cn('flex', m.sender === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cn('max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm', m.sender === 'user' ? 'bg-brand-600 text-white' : m.sender === 'ai' ? 'border border-violet-200 bg-violet-50 text-slate-900' : 'border border-slate-200 bg-white')}>
                  {m.sender === 'ai' && <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-700">AI Assistant</p>}
                  <p>{m.content}</p>
                  <p className={cn('mt-1 text-[10px]', m.sender === 'user' ? 'text-brand-100' : 'text-slate-500')}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 bg-white p-3">
            <div className="flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Type a message…" aria-label="Chat message" />
              <Button onClick={send} size="icon" aria-label="Send"><Send size={15} /></Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ChatWidget
