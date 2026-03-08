import { Role } from './auth';

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export const roleNavigation: Record<Role, NavItem[]> = {
  admin: [
    { label: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Personnel', href: '/dashboard/personnel', icon: 'Users' },
    { label: 'Readiness', href: '/dashboard/readiness', icon: 'Activity' },
    { label: 'Appointments', href: '/dashboard/appointments', icon: 'Calendar' },
    { label: 'Programs', href: '/dashboard/programs', icon: 'Dumbbell' },
    { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
    { label: 'Messages', href: '/dashboard/messages', icon: 'MessageSquare' },
    { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
  ],
  commander: [
    { label: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Personnel', href: '/dashboard/personnel', icon: 'Users' },
    { label: 'Readiness', href: '/dashboard/readiness', icon: 'Activity' },
    { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
    { label: 'Messages', href: '/dashboard/messages', icon: 'MessageSquare' },
    { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
  ],
  physician: [
    { label: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Patients', href: '/dashboard/personnel', icon: 'Users' },
    { label: 'Appointments', href: '/dashboard/appointments', icon: 'Calendar' },
    { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
    { label: 'Messages', href: '/dashboard/messages', icon: 'MessageSquare' },
    { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
  ],
  psychologist: [
    { label: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Patients', href: '/dashboard/personnel', icon: 'Users' },
    { label: 'Appointments', href: '/dashboard/appointments', icon: 'Calendar' },
    { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
    { label: 'Messages', href: '/dashboard/messages', icon: 'MessageSquare' },
    { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
  ],
  trainer: [
    { label: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Athletes', href: '/dashboard/personnel', icon: 'Users' },
    { label: 'Programs', href: '/dashboard/programs', icon: 'Dumbbell' },
    { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
    { label: 'Messages', href: '/dashboard/messages', icon: 'MessageSquare' },
    { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
  ],
  user: [
    { label: 'My Data', href: '/dashboard/my-data', icon: 'User' },
    { label: 'Programs', href: '/dashboard/programs', icon: 'Dumbbell' },
    { label: 'Messages', href: '/dashboard/messages', icon: 'MessageSquare' },
    { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
  ],
};

export const roleBadgeColors: Record<Role, string> = {
  admin: 'bg-violet/20 text-violet border-violet/30',
  commander: 'bg-cold/20 text-cold2 border-cold/30',
  physician: 'bg-signal/20 text-signal border-signal/30',
  psychologist: 'bg-violet/20 text-violet border-violet/30',
  trainer: 'bg-amber/20 text-amber border-amber/30',
  user: 'bg-cyan/20 text-cyan border-cyan/30',
};

export const roleLabels: Record<Role, string> = {
  admin: 'Administrator',
  commander: 'Commander',
  physician: 'Physician',
  psychologist: 'Psychologist',
  trainer: 'Trainer',
  user: 'Personnel',
};
