'use client'

import { useState } from 'react'
import { Users, MessageSquare, Clock, AlertCircle, CheckCircle } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Conversations', value: '1,234', icon: MessageSquare, color: 'blue' },
    { label: 'Active Agents', value: '12', icon: Users, color: 'green' },
    { label: 'Pending Approval', value: '3', icon: Clock, color: 'yellow' },
    { label: 'SLA Breached', value: '2', icon: AlertCircle, color: 'red' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold">Admin Portal</h1>
      </header>
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`text-${stat.color}-600`} size={24} />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg">Manage Employees</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg">Approve Pending Users</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg">AI Settings</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg">View Audit Logs</button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="font-semibold mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Service</span>
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <CheckCircle size={16} /> Enabled
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <CheckCircle size={16} /> Healthy
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Redis</span>
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <CheckCircle size={16} /> Connected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
