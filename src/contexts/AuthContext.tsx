/** @format */

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "pyxis_auth_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Fake auth: accept any non-empty credentials. Replace with real API call.
    if (!email || !password) throw new Error("Missing credentials");
    const u = { name: email.split("@")[0] || "User", email };
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function RequireAuth({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();
  if (!user) return <>{/* placeholder; consumer should redirect */}</>;
  return children;
}
