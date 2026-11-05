'use client'

import { MessageCircle, Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useState } from 'react'

const faqs = [
  { id: 1, category: 'Getting Started', question: 'How do I get started with the platform?', answer: 'Sign up for an account and follow our onboarding guide.' },
  { id: 2, category: 'Account', question: 'How do I reset my password?', answer: 'Click "Forgot Password" on the login page and check your email.' },
  { id: 3, category: 'Billing', question: 'What payment methods do you accept?', answer: 'We accept all major credit cards and PayPal.' },
  { id: 4, category: 'Support', question: 'How can I contact support?', answer: 'Use the chat widget or this help center.' },
]

export default function HelpCenterPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))]

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleChatFromFaq = (faq: any) => {
    // Context transfer to chat
    console.log('Start chat with FAQ context:', faq)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl font-bold mb-2">Help & Support Center</h1>
          <p className="text-gray-600 mb-8">Search our knowledge base or chat with our support team</p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for answers..."
              className="pl-12 h-12 text-base"
            />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <section className="mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-1">Need immediate assistance?</h2>
                <p className="text-gray-600">Our AI-powered support is available 24/7</p>
              </div>
              <Button size="lg">
                <MessageCircle size={18} className="mr-2" />
                Chat with us
              </Button>
            </div>
          </Card>
        </section>

        <section className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            {selectedCategory === 'All' ? 'Frequently Asked Questions' : selectedCategory}
          </h2>
          <div className="space-y-3">
            {filteredFaqs.map(faq => (
              <Card key={faq.id} className="p-6">
                <h3 className="font-semibold mb-2 text-lg">{faq.question}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{faq.answer}</p>
                <button
                  onClick={() => handleChatFromFaq(faq)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors"
                >
                  <MessageCircle size={16} />
                  Chat with us about this
                  <ArrowRight size={14} />
                </button>
              </Card>
            ))}
          </div>
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No results found. Try adjusting your search or chat with us directly.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
