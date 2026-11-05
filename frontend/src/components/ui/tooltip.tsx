'use client'

import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils/cn'

export function Tooltip({ label, children, disabled }: { label: string; children: ReactNode; disabled?: boolean }) {
  const [show, setShow] = useState(false)
  if (disabled) return <>{children}</>
  return (
    <span className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      {children}
      {show && (
        <span role="tooltip" className={cn('pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-slate-200 bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-lg')}>
          {label}
        </span>
      )}
    </span>
  )
}
