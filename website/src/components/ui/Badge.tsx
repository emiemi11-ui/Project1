'use client';
import { clsx } from 'clsx';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'pulse';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium rounded-full',
        {
          'bg-white/10 text-ice3': variant === 'default',
          'bg-signal/10 text-signal border border-signal/20': variant === 'success' || variant === 'pulse',
          'bg-amber/10 text-amber border border-amber/20': variant === 'warning',
          'bg-red/10 text-red border border-red/20': variant === 'danger',
          'bg-cyan/10 text-cyan border border-cyan/20': variant === 'info',
        },
        className,
      )}
    >
      {variant === 'pulse' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
        </span>
      )}
      {children}
    </span>
  );
}
