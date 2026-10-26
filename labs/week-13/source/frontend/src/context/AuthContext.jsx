import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { hasAuthToken, loginStaff, logoutStaff } from '../services/requestService.js';

const USER_KEY = 'campus-service-user';
const AuthContext = createContext(null);

function readStoredUser() {
  if (!hasAuthToken()) return null;
  try {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const login = useCallback(async (email, password) => {
    const loggedIn = await loginStaff(email, password);
    sessionStorage.setItem(USER_KEY, JSON.stringify(loggedIn));
    setUser(loggedIn);
    return loggedIn;
  }, []);

  const logout = useCallback(() => {
    logoutStaff();
    sessionStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isStaff: user?.role === 'staff', login, logout }),
    [user, login, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth ต้องใช้ภายใน AuthProvider');
  return context;
}
