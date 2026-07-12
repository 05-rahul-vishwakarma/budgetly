import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Budget, BudgetWithProgress } from '@/types';

interface BudgetState {
  budgets: BudgetWithProgress[];
  isLoading: boolean;
  error: string | null;
  setBudgets: (budgets: BudgetWithProgress[]) => void;
  addBudget: (budget: BudgetWithProgress) => void;
  updateBudget: (id: string, updates: Partial<BudgetWithProgress>) => void;
  deleteBudget: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set) => ({
      budgets: [],
      isLoading: false,
      error: null,
      setBudgets: (budgets) => set({ budgets }),
      addBudget: (budget) => set((state) => ({ budgets: [...state.budgets, budget] })),
      updateBudget: (id, updates) => set((state) => ({
        budgets: state.budgets.map((b) => b.id === id ? { ...b, ...updates } : b)
      })),
      deleteBudget: (id) => set((state) => ({
        budgets: state.budgets.filter((b) => b.id !== id)
      })),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'budget-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
