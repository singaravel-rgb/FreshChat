import type { LucideIcon } from 'lucide-react'
import {
  Inbox,
  MessageSquare,
  AtSign,
  UserX,
  LayoutDashboard,
  Users,
  BarChart3,
  Globe,
  Mail,
  Layers,
  BookOpen,
  Bot,
  Settings,
} from 'lucide-react'

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  badge?: string
}

export type NavGroup = {
  title: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    title: 'Primary',
    items: [
      { label: 'Inbox', href: '/inbox', icon: Inbox },
      { label: 'Conversations', href: '/inbox', icon: MessageSquare },
      { label: 'Mentions', href: '/inbox', icon: AtSign },
      { label: 'Unassigned', href: '/inbox', icon: UserX },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Dashboard', href: '/agent/dashboard', icon: LayoutDashboard },
      { label: 'Agents & Teams', href: '/admin/dashboard', icon: Users },
      { label: 'Reports', href: '/admin/dashboard', icon: BarChart3 },
    ],
  },
  {
    title: 'Channels',
    items: [
      { label: 'Website Chat', href: '/admin/dashboard', icon: Globe },
      { label: 'Email', href: '/admin/dashboard', icon: Mail, badge: 'Soon' },
      { label: 'Other Channels', href: '/admin/dashboard', icon: Layers },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { label: 'Help Center', href: '/help', icon: BookOpen },
      { label: 'AI Configuration', href: '/admin/dashboard', icon: Bot },
      { label: 'Admin Settings', href: '/admin/dashboard', icon: Settings },
    ],
  },
]
