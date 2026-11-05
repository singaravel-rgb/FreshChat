import { User } from '@/lib/api/client'

export interface Conversation {
  id: string
  customer_id: string
  status: 'new' | 'ai_handling' | 'queued_human' | 'assigned' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  assigned_agent_id?: string
  team_id?: string
  ai_handled: boolean
  created_at: string
  updated_at: string
  customer?: Customer
}

export interface Customer {
  id: string
  name?: string
  email?: string
  phone?: string
  organization_id: string
}

export interface Message {
  id: string
  conversation_id: string
  sender_type: 'customer' | 'agent' | 'ai' | 'system'
  sender_id?: string
  content: string
  internal_note: boolean
  created_at: string
  attachments?: any[]
}
