import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction } from '@/types';

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  filters: {
    dateRange?: { start: string; end: string };
    category?: string;
    bankId?: string;
    type?: 'credit' | 'debit';
    search?: string;
  };
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<TransactionState['filters']>) => void;
  clearFilters: () => void;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      isLoading: false,
      error: null,
      filters: {},
      setTransactions: (transactions) => set({ transactions }),
      addTransaction: (transaction) => set((state) => ({ transactions: [transaction, ...state.transactions] })),
      updateTransaction: (id, updates) => set((state) => ({
        transactions: state.transactions.map((t) => t.id === id ? { ...t, ...updates } : t)
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
      clearFilters: () => set({ filters: {} }),
    }),
    {
      name: 'transaction-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ transactions: state.transactions }),
    }
  )
);
