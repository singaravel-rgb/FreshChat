import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export function Avatar({ name, className, size = 'md' }: { name?: string; className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = (name || '?')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-slate-200 font-medium text-slate-700',
        size === 'sm' && 'h-7 w-7 text-[10px]',
        size === 'md' && 'h-9 w-9 text-xs',
        size === 'lg' && 'h-11 w-11 text-sm',
        className
      )}
      aria-label={name}
    >
      {initials}
    </div>
  )
}
