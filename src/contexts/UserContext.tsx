import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthUser {
  name: string;
  emailAddress: string;
  role: "admin" | "trainee";
  profilePicture?: string;
  enrolledSessions: unknown[];
  enrolledCourses: unknown[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface UserContextType {
  user: AuthUser | null;
  token: string | null;
  login: (data: { token: string; user: AuthUser }) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const LOCAL_STORAGE_KEY = "TerraAuthData";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.token && parsed?.user) {
          setToken(parsed.token);
          setUser(parsed.user);
        }
      } catch (e) {
        console.warn("Failed to parse user data from localStorage", e);
        localStorage.removeItem(LOCAL_STORAGE_KEY); // cleanup corrupt data
      }
    }
  }, []);

  const login = ({ token, user }: { token: string; user: AuthUser }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ token, user }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const isAuthenticated = !!token && !!user;

  return (
    <UserContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};
