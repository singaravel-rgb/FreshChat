'use client'

import { User, Mail, Phone, Tag, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function CustomerPanel() {
  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold">Customer Details</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={24} />
          </div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500">Customer</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail size={16} className="text-gray-400" />
            <span>john.doe@example.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone size={16} className="text-gray-400" />
            <span>+1 234 567 8900</span>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium mb-2">Conversation</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">Queued</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Priority</span>
              <span>Normal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Channel</span>
              <span>Web Chat</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">AI Handled</span>
              <span>Yes</span>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium mb-2">Tags</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Order Issue</span>
          </div>
          <Button variant="outline" size="sm" className="w-full">Add Tag</Button>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
            <AlertCircle size={16} />
            SLA
          </h3>
          <div className="text-sm text-gray-600">
            <p>First response due in 15 min</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
