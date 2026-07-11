// Global types
export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  avatar?: string;
  createdAt: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  currency: string;
  language: string;
  notifications: {
    budgetAlerts: boolean;
    transactionUpdates: boolean;
    paymentReminders: boolean;
    syncStatus: boolean;
    weeklyReport: boolean;
  };
  privacy: {
    analytics: boolean;
    crashReporting: boolean;
    personalizedAds: boolean;
  };
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Transaction types
export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  merchant?: string;
  description: string;
  date: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

// Budget types
export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
  alertThreshold: number;
  isActive: boolean;
  rollover: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetWithProgress extends Budget {
  spent: number;
  remaining: number;
  progress: number;
  isOverBudget: boolean;
  daysRemaining: number;
  categoryName: string;
}

// Bank types
export interface BankAccount {
  id: string;
  userId: string;
  bankId: string;
  bankName: string;
  accountType: 'savings' | 'checking' | 'credit';
  accountNumber: string;
  ifsc: string;
  balance: number;
  currency: string;
  isActive: boolean;
  lastSyncedAt: string;
  createdAt: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
}

// Analytics types
export interface CategoryBreakdown {
  categoryId: string;
  categoryName: string;
  icon: string;
  color: string;
  amount: number;
  percentage: number;
  transactionCount: number;
  trend: 'up' | 'down' | 'stable';
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expense: number;
  net: number;
}

export interface MerchantSpending {
  merchant: string;
  amount: number;
  transactionCount: number;
  category: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'savings' | 'spending' | 'budget' | 'investment';
  priority: 'high' | 'medium' | 'low';
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  session: Session | null;
}

export interface AuthFormData {
  phone: string;
  otp: string;
  name: string;
  email?: string;
}

export interface LoginCredentials {
  phone: string;
}

export interface RegisterData {
  phone: string;
  name: string;
  email?: string;
}

export interface OTPData {
  otp: string;
}