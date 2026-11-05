'use client'

import Link from 'next/link'
import { Search, MessageCircle } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  { id: 1, category: 'Getting Started', question: 'How do I get started?', answer: 'Create an account and explore the platform.' },
  { id: 2, category: 'Account', question: 'How do I reset my password?', answer: 'Use the forgot password link on the login page.' },
  { id: 3, category: 'Billing', question: 'What are the pricing plans?', answer: 'Contact our sales team for pricing information.' },
]

export default function HelpCenterPage() {
  const [search, setSearch] = useState('')
  const [activeChat, setActiveChat] = useState(false)

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
          <p className="text-gray-600 mb-6">How can we help you today?</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <section className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-1">Still need help?</h2>
              <p className="text-gray-600">Chat with our AI-powered support team</p>
            </div>
            <button 
              onClick={() => setActiveChat(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <MessageCircle size={18} />
              Chat with us
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredFaqs.map(faq => (
              <div key={faq.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 mb-4">{faq.answer}</p>
                <button 
                  onClick={() => setActiveChat(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <MessageCircle size={16} />
                  Chat with us about this
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
