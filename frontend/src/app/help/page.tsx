'use client'

import { useState } from 'react'
import { MessageCircle, Search, ArrowRight, Headset } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ChatWidget from '@/features/chat-widget/ChatWidget'

const faqs = [
  { id: 1, category: 'Getting Started', question: 'How do I get started with the platform?', answer: 'Sign up for an account and follow the onboarding guide. An admin may need to approve access depending on your organization settings.' },
  { id: 2, category: 'Account', question: 'How do I reset my password?', answer: 'Use “Forgot Password” on the login page. If your account is managed by an admin, contact your support team.' },
  { id: 3, category: 'Conversations', question: 'How does AI handle my message?', answer: 'Every conversation is evaluated by AI first. If the request can be resolved safely using approved knowledge, AI responds. Otherwise it escalates to a human agent with context.' },
  { id: 4, category: 'Support', question: 'Can I talk to a human agent?', answer: 'Yes. Ask for a human at any time, or use the chat option on an article to start a conversation with context.' },
]

export default function HelpCenterPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))]
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) || faq.answer.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white"><Headset size={16} /></span>
            <span className="text-sm font-semibold text-slate-900">Help Center</span>
          </div>
          <Badge variant="brand">AI-first support</Badge>
        </div>
        <div className="mx-auto max-w-3xl px-6 pb-10 pt-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">How can we help?</h1>
          <p className="mt-2 text-sm text-slate-500">Search approved answers or start a conversation. AI assists first; a human agent can take over when needed.</p>
          <div className="relative mt-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles and FAQs..." className="h-11 pl-10" aria-label="Search help center" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <Card className="mb-6 flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Need more help?</h2>
            <p className="mt-1 text-sm text-slate-500">Start a chat with AI-powered support. Escalation to a human agent is available when required.</p>
          </div>
          <Button><MessageCircle size={16} />Chat with us</Button>
        </Card>

        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat} type="button" onClick={() => setSelectedCategory(cat)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-brand-600 text-white' : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq) => (
            <Card key={faq.id} className="p-5">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="muted">{faq.category}</Badge>
              </div>
              <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
              <button type="button" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                <MessageCircle size={15} />Chat with us about this<ArrowRight size={14} />
              </button>
            </Card>
          ))}
          {filteredFaqs.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">No articles found. Try a different search or start a chat.</div>}
        </div>
      </main>
      <ChatWidget />
    </div>
  )
}
