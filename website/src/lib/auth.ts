export type Role = 'admin' | 'commander' | 'physician' | 'psychologist' | 'trainer' | 'user';

export interface User {
  email: string;
  name: string;
  role: Role;
  token: string;
}

const ACCOUNTS: Record<string, { password: string; name: string; role: Role }> = {
  'admin@vitanova.io': { password: 'admin123', name: 'Admin', role: 'admin' },
  'commander@vitanova.io': { password: 'cmd123', name: 'Cdr. Bogdan Avram', role: 'commander' },
  'doctor@vitanova.io': { password: 'doc123', name: 'Dr. Elena Marinescu', role: 'physician' },
  'psych@vitanova.io': { password: 'psy123', name: 'Psych. Ana Voicu', role: 'psychologist' },
  'trainer@vitanova.io': { password: 'train123', name: 'Trainer Mihai Costin', role: 'trainer' },
  'user@vitanova.io': { password: 'user123', name: 'Cpl. R. Stanescu', role: 'user' },
};

const INVITATION_CODES = ['UNIT-2025', 'FORMATION-2025', 'COMMAND-2025'];

export function login(email: string, password: string): User | null {
  const account = ACCOUNTS[email];
  if (!account || account.password !== password) return null;
  const user: User = {
    email,
    name: account.name,
    role: account.role,
    token: btoa(`${email}:${Date.now()}`),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem('vitanova_user', JSON.stringify(user));
  }
  return user;
}

export function register(name: string, email: string, password: string, invitationCode: string): User | null {
  if (!INVITATION_CODES.includes(invitationCode)) return null;
  if (ACCOUNTS[email]) return null;
  const user: User = {
    email,
    name,
    role: 'user',
    token: btoa(`${email}:${Date.now()}`),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem('vitanova_user', JSON.stringify(user));
  }
  return user;
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('vitanova_user');
  }
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('vitanova_user');
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
}

export function getDemoAccounts() {
  return Object.entries(ACCOUNTS).map(([email, { name, role }]) => ({
    email,
    name,
    role,
  }));
}
