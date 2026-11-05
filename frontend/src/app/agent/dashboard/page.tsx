'use client'

import { useState } from 'react'
import { Bell, Search, Inbox, MessageSquare, Users, BarChart3, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const stats = [
  { label: 'All Conversations', value: '24', icon: Inbox, color: 'blue' },
  { label: 'Open', value: '12', icon: MessageSquare, color: 'green' },
  { label: 'In Queue', value: '5', icon: Users, color: 'yellow' },
  { label: 'Pending', value: '3', icon: Bell, color: 'orange' },
  { label: 'AI Handled', value: '18', icon: BarChart3, color: 'purple' },
]

const recentConversations = [
  { id: '1', customer: 'John Doe', subject: 'Order delivery issue', status: 'assigned', time: '2 min ago' },
  { id: '2', customer: 'Sarah Smith', subject: 'Billing question', status: 'queued_human', time: '5 min ago' },
  { id: '3', customer: 'Mike Johnson', subject: 'Product return', status: 'ai_handling', time: '10 min ago' },
]

export default function AgentDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Agent Dashboard</h1>
          <div className="flex items-center gap-3">
            <Link href="/inbox">
              <Button>Go to Inbox</Button>
            </Link>
            <Button variant="outline">Settings</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className="text-gray-400" size={24} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentConversations.map((conv) => (
                  <div key={conv.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {conv.customer[0]}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{conv.customer}</p>
                        <p className="text-sm text-gray-600">{conv.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        conv.status === 'assigned' ? 'bg-green-100 text-green-800' :
                        conv.status === 'queued_human' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {conv.status.replace('_', ' ')}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{conv.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>SLA Compliance</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>First Response Time</span>
                    <span className="font-medium">2.3 min</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Resolution Time</span>
                    <span className="font-medium">15 min</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
