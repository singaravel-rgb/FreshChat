'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils/cn'

interface Message {
  id: string
  sender: 'user' | 'ai' | 'agent'
  content: string
  timestamp: string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: 'Hi! How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, newMessage])
    setInput('')
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: 'Thanks for reaching out. I\'m analyzing your request...',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    }, 1000)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-50"
        aria-label="Open support chat"
      >
        <MessageCircle size={24} />
      </button>
    )
  }

  return (
    <div className={cn(
      "fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200 transition-all",
      isMinimized ? "h-14" : "h-[500px]"
    )}>
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle size={20} />
          <div>
            <h3 className="font-semibold text-sm">Support Chat</h3>
            <p className="text-xs opacity-90">AI-powered • Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-blue-700 rounded">
            <Minimize2 size={16} />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-blue-700 rounded">
            <X size={16} />
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[75%] rounded-lg p-3",
                    msg.sender === 'user' && "bg-blue-600 text-white",
                    msg.sender === 'ai' && "bg-white border border-gray-200",
                    msg.sender === 'agent' && "bg-green-100 border border-green-200"
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={cn(
                    "text-xs mt-1",
                    msg.sender === 'user' ? "text-blue-100" : "text-gray-500"
                  )}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={sendMessage} size="sm">
                <Send size={16} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Powered by AI</p>
          </div>
        </>
      )}
    </div>
  )
}

export default ChatWidget
