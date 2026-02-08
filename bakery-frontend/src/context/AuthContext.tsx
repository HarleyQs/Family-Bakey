import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole, hasPermission, Permission } from "../types/roles";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check session cookie on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    checkSession();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("authToken", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.some((perm) => hasPermission(user.role, perm));
  };

  const checkAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.every((perm) => hasPermission(user.role, perm));
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
    hasPermission: checkPermission,
    hasAnyPermission: checkAnyPermission,
    hasAllPermissions: checkAllPermissions,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
