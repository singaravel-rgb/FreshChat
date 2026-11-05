import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'purple' | 'muted'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-1.5 py-0.5 text-2xs font-medium',
        {
          'bg-slate-100 text-slate-700': variant === 'default' || variant === 'muted',
          'bg-brand-50 text-brand-700': variant === 'brand',
          'bg-emerald-50 text-emerald-700': variant === 'success',
          'bg-amber-50 text-amber-700': variant === 'warning',
          'bg-red-50 text-red-700': variant === 'danger',
          'bg-violet-50 text-violet-700': variant === 'purple',
        },
        className
      )}
      {...props}
    />
  )
}
