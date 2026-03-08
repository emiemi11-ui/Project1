'use client';
import { clsx } from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'fill' | 'ghost' | 'danger' | 'signal';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'fill', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'relative inline-flex items-center justify-center font-syne font-semibold uppercase tracking-wider transition-all duration-300',
          {
            'bg-cold hover:bg-cold2 text-white shadow-lg shadow-cold/20 hover:shadow-cold/40': variant === 'fill',
            'bg-transparent border border-white/20 text-white hover:border-white/50 hover:bg-white/5': variant === 'ghost',
            'bg-red/10 border border-red/30 text-red hover:bg-red/20': variant === 'danger',
            'bg-signal hover:bg-signal/90 text-ink shadow-lg shadow-signal/20': variant === 'signal',
          },
          {
            'px-4 py-2 text-xs rounded-lg': size === 'sm',
            'px-6 py-3 text-sm rounded-lg': size === 'md',
            'px-8 py-4 text-base rounded-xl': size === 'lg',
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
