import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BankAccount } from '@/shared/types';

interface BankState {
  accounts: BankAccount[];
  isLoading: boolean;
  error: string | null;
  setAccounts: (accounts: BankAccount[]) => void;
  addAccount: (account: BankAccount) => void;
  updateAccount: (id: string, updates: Partial<BankAccount>) => void;
  removeAccount: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useBankStore = create<BankState>()(
  persist(
    (set) => ({
      accounts: [],
      isLoading: false,
      error: null,
      setAccounts: (accounts) => set({ accounts }),
      addAccount: (account) => set((state) => ({ accounts: [...state.accounts, account] })),
      updateAccount: (id, updates) => set((state) => ({
        accounts: state.accounts.map((a) => a.id === id ? { ...a, ...updates } : a)
      })),
      removeAccount: (id) => set((state) => ({
        accounts: state.accounts.filter((a) => a.id !== id)
      })),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'bank-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ accounts: state.accounts }),
    }
  )
);
