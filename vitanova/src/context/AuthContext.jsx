import { createContext, useReducer, useEffect } from 'react';
import usersData from '../data/users.json';
import { generateToken, storeSession, getStoredSession, clearSession } from '../utils/mockAuth';
import { getRoleConfig, hasPermission as checkPermission } from '../utils/roles';

export const AuthContext = createContext(null);

const USERS_STORAGE_KEY = 'vitanova_users_db';

const getUsers = () => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : usersData;
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true, loading: false };
    case 'LOGOUT':
      return { ...state, user: null, token: null, isAuthenticated: false, loading: false };
    case 'LOADED':
      return { ...state, loading: false };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const session = getStoredSession();
    if (session) {
      dispatch({ type: 'LOGIN', payload: session });
    } else {
      dispatch({ type: 'LOADED' });
    }
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Invalid email or password' };
    if (!user.active) return { success: false, error: 'Account is deactivated' };
    const token = generateToken(user);
    const safeUser = { id: user.id, email: user.email, name: user.name, role: user.role };
    storeSession(safeUser, token);
    dispatch({ type: 'LOGIN', payload: { user: safeUser, token } });
    return { success: true };
  };

  const register = (userData) => {
    const users = getUsers();
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser = {
      id: `u${Date.now()}`,
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: 'user',
      active: true,
      created: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    saveUsers(users);
    return { success: true };
  };

  const logout = () => {
    clearSession();
    dispatch({ type: 'LOGOUT' });
  };

  const hasRole = (role) => {
    if (!state.user) return false;
    if (state.user.role === 'admin') return true;
    return state.user.role === role;
  };

  const hasPermission = (permission) => {
    if (!state.user) return false;
    return checkPermission(state.user.role, permission);
  };

  const hasMinLevel = (minLevel) => {
    if (!state.user) return false;
    const roleConfig = getRoleConfig(state.user.role);
    return roleConfig.level >= minLevel;
  };

  const getAllUsers = () => getUsers();

  const updateUser = (userId, updates) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;
    users[idx] = { ...users[idx], ...updates };
    saveUsers(users);
    if (state.user && state.user.id === userId) {
      const safeUser = { id: users[idx].id, email: users[idx].email, name: users[idx].name, role: users[idx].role };
      dispatch({ type: 'UPDATE_USER', payload: safeUser });
      storeSession(safeUser, state.token);
    }
    return true;
  };

  const createUser = (userData) => {
    const users = getUsers();
    if (users.find(u => u.email === userData.email)) return { success: false, error: 'Email exists' };
    const newUser = {
      id: `u${Date.now()}`,
      ...userData,
      active: true,
      created: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    saveUsers(users);
    return { success: true, user: newUser };
  };

  const deleteUser = (userId) => {
    const users = getUsers().filter(u => u.id !== userId);
    saveUsers(users);
    return true;
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      hasRole,
      hasPermission,
      hasMinLevel,
      getAllUsers,
      updateUser,
      createUser,
      deleteUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
