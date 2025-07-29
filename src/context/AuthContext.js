// src/context/AuthContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Cache the users list so we only fetch once
  const usersCache = useRef(null);

  // Restore session on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    const saved = localStorage.getItem('user');
    if (token && saved) {
      setUser(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // 1. Load & cache users
      if (!usersCache.current) {
        const res = await fetch('https://dummyjson.com/users?limit=100');
        if (!res.ok) throw new Error('Failed to load user list');
        const { users } = await res.json();
        usersCache.current = users;
      }

      // 2. Find the user by email
      const match = usersCache.current.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (!match) throw new Error('Email not registered');

      // 3. Authenticate with the matched username
      const authRes = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: match.username,
          password,
        }),
      });
      if (!authRes.ok) {
        const err = await authRes.json().catch(() => ({}));
        throw new Error(err.message || 'Invalid credentials');
      }
      const data = await authRes.json();

      // 4. Persist session
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};