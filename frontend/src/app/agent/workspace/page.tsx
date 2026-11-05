'use client'

import Link from 'next/link'
import { useAuthStore } from '@/lib/auth/store'

export default function AgentWorkspacePage() {
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Agent Workspace</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button onClick={logout} className="text-sm text-red-600 hover:text-red-700">
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="flex h-[calc(100vh-64px)]">
        <aside className="w-80 bg-white border-r border-gray-200">
          <div className="p-4">
            <h2 className="font-semibold mb-4">Inbox</h2>
            <div className="text-sm text-gray-500">No conversations</div>
          </div>
        </aside>
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-6">
            <div className="text-center text-gray-500 mt-20">Select a conversation</div>
          </div>
        </main>
        <aside className="w-80 bg-white border-l border-gray-200">
          <div className="p-4">
            <h2 className="font-semibold mb-4">Customer Details</h2>
          </div>
        </aside>
      </div>
    </div>
  )
}
