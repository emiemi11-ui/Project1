'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { roleNavigation, roleBadgeColors, roleLabels } from '@/lib/roles';
import {
  LayoutDashboard, Users, Activity, Calendar, Dumbbell,
  BarChart3, MessageSquare, Settings, User, LogOut,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Users, Activity, Calendar, Dumbbell,
  BarChart3, MessageSquare, Settings, User,
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) return null;

  const navigation = roleNavigation[user.role] || [];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-panel border-r border-white/5 flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan to-signal rounded-md rotate-45" />
            <div className="absolute inset-[2px] bg-panel rounded-[4px] rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-signal font-bold text-[10px]">V</span>
            </div>
          </div>
          <span className="font-syne font-bold text-xs tracking-[2px] text-ice">VITANOVA</span>
        </Link>
      </div>

      {/* Role label */}
      <div className="px-6 py-3">
        <span className={`inline-flex px-2 py-0.5 text-[10px] font-mono rounded border ${roleBadgeColors[user.role]}`}>
          {roleLabels[user.role]}
        </span>
        <p className="text-[10px] text-ice3/50 font-mono mt-1">Command Interface</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-auto">
        {navigation.map(item => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive = pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-cyan/10 text-cyan border-l-2 border-cyan'
                  : 'text-ice3 hover:text-ice hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cold/20 flex items-center justify-center">
            <span className="text-xs font-bold text-cold2">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-ice truncate">{user.name}</p>
            <p className="text-[10px] text-ice3 font-mono truncate">{user.email}</p>
          </div>
          <button
            onClick={() => { logout(); window.location.href = '/auth/login'; }}
            className="text-ice3 hover:text-red transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
