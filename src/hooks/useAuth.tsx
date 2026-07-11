'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAuthStore, useAuthStoreSetters } from '@/features/auth/store/authStore';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  createProfile: (name: string, avatar?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const { logout, setUser, setLoading } = useAuthStoreSetters();

  const login = async (phone: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const verifyOTP = async (otp: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      phone: '+91 98765 43210',
      name: 'Alex Johnson',
      avatar: undefined,
      email: 'alex@example.com',
      createdAt: new Date().toISOString(),
      preferences: {
        theme: 'system',
        currency: 'INR',
        language: 'en',
        notifications: {
          budgetAlerts: true,
          transactionUpdates: true,
          paymentReminders: true,
          syncStatus: true,
          weeklyReport: false,
        },
        privacy: {
          analytics: true,
          crashReporting: true,
          personalizedAds: false,
        },
      },
    };
    
    setUser(mockUser);
    setLoading(false);
  };

  const createProfile = async (name: string, avatar?: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    if (user) {
      setUser({ ...user, name, avatar });
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, verifyOTP, createProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
