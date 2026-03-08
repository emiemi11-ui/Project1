'use client';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { roleBadgeColors, roleLabels } from '@/lib/roles';
import { Bell } from 'lucide-react';

export default function TopBar() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumb = segments.map((s, i) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' '),
    isLast: i === segments.length - 1,
  }));

  return (
    <header className="h-16 bg-panel/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        {breadcrumb.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-ice3/30">/</span>}
            <span className={item.isLast ? 'text-ice font-medium' : 'text-ice3'}>
              {item.label}
            </span>
          </span>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className={`inline-flex px-2 py-0.5 text-[10px] font-mono rounded border ${roleBadgeColors[user.role]}`}>
          {roleLabels[user.role]}
        </span>
        <span className="text-sm text-ice2">{user.name}</span>
        <button className="relative text-ice3 hover:text-ice transition-colors">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red rounded-full text-[7px] flex items-center justify-center text-white font-bold">
            3
          </span>
        </button>
      </div>
    </header>
  );
}
