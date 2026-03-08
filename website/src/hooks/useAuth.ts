'use client';
import { useState, useEffect, useCallback } from 'react';
import { User, getUser, login as authLogin, logout as authLogout } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getUser());
    setLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const u = authLogin(email, password);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
  }, []);

  return { user, loading, login, logout, isAuthenticated: !!user };
}
