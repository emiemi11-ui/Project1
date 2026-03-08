'use client';
import { clsx } from 'clsx';

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export default function PhoneMockup({ children, className, scale = 1 }: PhoneMockupProps) {
  return (
    <div
      className={clsx('relative', className)}
      style={{ transform: `scale(${scale})` }}
    >
      {/* Phone frame */}
      <div className="relative w-[280px] h-[580px] rounded-[40px] bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f] p-[3px] shadow-2xl shadow-black/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-[#0a0a0f] rounded-b-2xl z-10" />
        <div className="w-full h-full rounded-[37px] bg-ink overflow-hidden relative">
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-6 z-20">
            <span className="text-[10px] font-mono text-white/60">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2.5 border border-white/40 rounded-sm p-[1px]">
                <div className="w-2/3 h-full bg-signal rounded-[1px]" />
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="w-full h-full pt-10 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
      {/* Reflections */}
      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </div>
  );
}
