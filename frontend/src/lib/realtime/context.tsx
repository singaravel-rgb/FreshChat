'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuthStore } from '@/lib/auth/store'

interface RealtimeContextType {
  socket: Socket | null
  connected: boolean
}

const RealtimeContext = createContext<RealtimeContextType>({
  socket: null,
  connected: false,
})

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  const { accessToken, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated || !accessToken) return

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000'
    const newSocket = io(wsUrl, {
      auth: { token: accessToken },
      transports: ['websocket'],
    })

    newSocket.on('connect', () => setConnected(true))
    newSocket.on('disconnect', () => setConnected(false))

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [isAuthenticated, accessToken])

  return (
    <RealtimeContext.Provider value={{ socket, connected }}>
      {children}
    </RealtimeContext.Provider>
  )
}

export const useRealtime = () => useContext(RealtimeContext)
