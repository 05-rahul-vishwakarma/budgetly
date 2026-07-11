import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { categories, banks, monthNames } from '@/constants/colors';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency = 'INR',
  locale = 'en-IN'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(amount: number, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
): string {
  return new Intl.DateTimeFormat('en-IN', options).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

export function getMonthKey(date: string | Date): string {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function getWeekKey(date: string | Date): string {
  const d = new Date(date);
  const week = Math.ceil(d.getDate() / 7);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-W${week}`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    return { ...groups, [groupKey]: [...(groups[groupKey] || []), item] };
  }, {} as Record<string, T[]>);
}

export function sumBy<T>(array: T[], selector: (item: T) => number): number {
  return array.reduce((sum, item) => sum + selector(item), 0);
}

export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'desc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

export function maskAccountNumber(accountNumber: string, visibleDigits = 4): string {
  if (accountNumber.length <= visibleDigits) return accountNumber;
  const masked = '*'.repeat(accountNumber.length - visibleDigits);
  return masked + accountNumber.slice(-visibleDigits);
}

export function getCategoryColor(categoryId: string): string {
  const categoryColors: Record<string, string> = {
    food: '#EF4444',
    shopping: '#EC4899',
    transport: '#3B82F6',
    bills: '#F59E0B',
    entertainment: '#8B5CF6',
    healthcare: '#10B981',
    education: '#06B6D4',
    investment: '#6366F1',
    income: '#22C55E',
    others: '#71717A',
  };
  return categoryColors[categoryId] || '#71717A';
}

export { categories, banks, monthNames };
