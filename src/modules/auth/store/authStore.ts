import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, UserPreferences } from '@/shared/types';
import { generateId } from '@/shared/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  createProfile: (name: string) => Promise<void>;
  logout: () => void;
  initializeAuth: () => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'system',
  currency: 'INR',
  language: 'en',
  notifications: {
    budgetAlerts: true,
    transactionUpdates: true,
    paymentReminders: true,
    syncStatus: true,
    weeklyReport: true,
  },
  privacy: {
    analytics: true,
    crashReporting: true,
    personalizedAds: false,
  },
};

const mockUser: User = {
  id: generateId(),
  phone: '+91 98765 43210',
  name: 'Rahul Sharma',
  email: 'rahul@example.com',
  avatar: undefined,
  createdAt: new Date().toISOString(),
  preferences: defaultPreferences,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: async (phone: string) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ isLoading: false });
      },

      verifyOTP: async (otp: string) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ 
          user: mockUser, 
          isAuthenticated: true, 
          isLoading: false 
        });

      },

      createProfile: async (name: string) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { ...currentUser, name }, 
            isLoading: false 
          });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      initializeAuth: async () => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1500));
        set({ 
          user: mockUser, 
          isAuthenticated: true, 
          isLoading: false 
        });
      },

      updatePreferences: (preferences) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { 
              ...currentUser, 
              preferences: { ...currentUser.preferences, ...preferences } 
            } 
          });
        }
      },

      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export const useAuthStoreSetters = () => useAuthStore((state) => ({
  login: state.login,
  verifyOTP: state.verifyOTP,
  createProfile: state.createProfile,
  logout: state.logout,
  setUser: state.setUser,
  setLoading: state.setLoading,
}));
