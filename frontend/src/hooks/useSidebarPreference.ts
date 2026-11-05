'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'support-platform.sidebar.collapsed'

export function useSidebarPreference(defaultCollapsed = true) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored !== null) setCollapsed(stored === '1')
    } catch {
      // ignore storage errors
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0')
    } catch {
      // ignore storage errors
    }
  }, [collapsed, hydrated])

  return {
    collapsed: hydrated ? collapsed : defaultCollapsed,
    setCollapsed,
    toggle: () => setCollapsed((v) => !v),
    hydrated,
  }
}
