import Link from 'next/link'
import { MessageCircle, Inbox, LayoutDashboard, Settings, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">AI Customer Support Platform</h1>
          <p className="text-xl text-gray-600 mb-2">Production-ready AI-first customer support platform</p>
          <p className="text-sm text-blue-600 font-medium">Freshchat-inspired • Built from scratch</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <HelpCircle className="text-blue-600" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Help Center</h2>
              </div>
              <p className="text-gray-600 mb-4">FAQ browsing with search, categories, and chat-from-FAQ</p>
              <Link href="/help">
                <Button className="w-full">View Help Center</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Inbox className="text-green-600" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Agent Inbox</h2>
              </div>
              <p className="text-gray-600 mb-4">3-column inbox with conversation thread, internal notes, and customer details</p>
              <Link href="/inbox">
                <Button className="w-full">Open Inbox</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <LayoutDashboard className="text-purple-600" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Agent Dashboard</h2>
              </div>
              <p className="text-gray-600 mb-4">Overview of conversations, SLA metrics, and agent performance</p>
              <Link href="/agent/dashboard">
                <Button className="w-full">View Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MessageCircle className="text-orange-600" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Agent Workspace</h2>
              </div>
              <p className="text-gray-600 mb-4">Full agent workspace with availability controls</p>
              <Link href="/agent/workspace">
                <Button className="w-full">Open Workspace</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Settings className="text-red-600" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Admin Portal</h2>
              </div>
              <p className="text-gray-600 mb-4">Manage users, teams, AI settings, and platform configuration</p>
              <Link href="/admin/dashboard">
                <Button className="w-full">Admin Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageCircle className="text-blue-600" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Chat Widget</h2>
              </div>
              <p className="text-gray-600 mb-4">Floating AI-powered chat widget - look bottom right!</p>
              <Button className="w-full" variant="outline">Widget Active</Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Features: AI-First Workflow • Workload-Based Routing • Real-Time Chat • SLA Management</p>
          <p className="text-sm text-gray-500">Built with Next.js 14, TypeScript, Tailwind CSS • FastAPI Backend</p>
        </div>
      </div>
    </main>
  )
}
