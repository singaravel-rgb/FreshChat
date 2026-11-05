'use client'

import { create } from 'zustand'
import { User } from '../api/client'

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setAuth: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token)
      localStorage.setItem('user', JSON.stringify(user))
    }
    set({ user, accessToken: token, isAuthenticated: true })
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    }
    set({ user: null, accessToken: null, isAuthenticated: false })
  },
}))
