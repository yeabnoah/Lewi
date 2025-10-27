import { authClient } from '@/lib/auth-client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

type SessionData = {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
  };
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
};

interface AuthContextType {
  session: SessionData | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render children until mounted to prevent hydration issues
  if (!mounted || isPending) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <AuthContext.Provider value={{ session: session as SessionData | null, isLoading: isPending }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

