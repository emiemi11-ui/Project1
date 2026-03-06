import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const roleNavItems = {
  admin: [
    { to: 'users', label: 'Users', icon: '⊞' },
    { to: 'personnel', label: 'Personnel', icon: '⊟' },
    { to: 'readiness', label: 'Readiness', icon: '◈' },
    { to: 'appointments', label: 'Appointments', icon: '◉' },
    { to: 'programs', label: 'Programs', icon: '⊡' },
  ],
  commander: [
    { to: 'personnel', label: 'Personnel', icon: '⊟' },
    { to: 'readiness', label: 'Readiness Overview', icon: '◈' },
  ],
  physician: [
    { to: 'personnel', label: 'Assigned Patients', icon: '⊟' },
    { to: 'appointments', label: 'Appointments', icon: '◉' },
  ],
  psychologist: [
    { to: 'personnel', label: 'Assigned Patients', icon: '⊟' },
    { to: 'appointments', label: 'Appointments', icon: '◉' },
  ],
  trainer: [
    { to: 'personnel', label: 'Assigned Athletes', icon: '⊟' },
    { to: 'programs', label: 'Programs', icon: '⊡' },
  ],
  user: [
    { to: 'my-data', label: 'My Data', icon: '◈' },
    { to: 'programs', label: 'My Programs', icon: '⊡' },
  ],
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = roleNavItems[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#12121a] border-r border-white/10 flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold tracking-wider text-[#00d4ff] font-[Syne]">
            VITANOVA
          </h1>
          <p className="text-[10px] text-gray-600 tracking-widest uppercase font-mono mt-1">
            Command Interface
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-[#00d4ff]/10 text-[#00d4ff] border-l-2 border-[#00d4ff]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border-l-2 border-transparent'
                }`
              }
            >
              <span className="text-xs opacity-60">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-sm text-gray-500 hover:text-red-400 transition-colors"
          >
            ⊘ Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-[#12121a] border-b border-white/10 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white text-xl"
          >
            ☰
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono uppercase tracking-wider px-2 py-1 bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20">
              {user?.role}
            </span>
            <span className="text-sm text-gray-300">{user?.name}</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
