'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, RefreshControl, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Plus, Bell, ChevronRight, TrendingUp, TrendingDown, Wallet, CreditCard, ArrowDownRight, ArrowUpRight, MoreHorizontal, Menu, Search, Filter, Target } from 'lucide-react-native';
import { formatCurrency, formatDate } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import { TransactionCard } from '@/features/transactions/components/TransactionCard';
import { BudgetCard } from '@/features/budget/components/BudgetCard';
import { BankCard } from '@/features/banks/components/BankCard';
import { useTransactionStore } from '@/features/transactions/store/transactionStore';
import { useBankStore } from '@/features/banks/store/bankStore';
import { useBudgetStore } from '@/features/budget/store/budgetStore';
import { useAuthStore } from '@/features/auth/store/authStore';
import { Transaction, BudgetWithProgress, BankAccount } from '@/types';

const mockTransactions: Transaction[] = [
  { id: '1', userId: '1', accountId: '1', amount: 450, type: 'debit', category: 'food', merchant: 'Swiggy', description: 'Lunch order', date: new Date().toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', userId: '1', accountId: '1', amount: 25000, type: 'credit', category: 'income', merchant: 'Salary', description: 'Monthly salary', date: new Date(Date.now() - 86400000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', userId: '1', accountId: '1', amount: 1200, type: 'debit', category: 'shopping', merchant: 'Amazon', description: 'Electronics', date: new Date(Date.now() - 172800000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', userId: '1', accountId: '1', amount: 350, type: 'debit', category: 'transport', merchant: 'Uber', description: 'Ride to office', date: new Date(Date.now() - 259200000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '5', userId: '1', accountId: '1', amount: 899, type: 'debit', category: 'entertainment', merchant: 'Netflix', description: 'Subscription', date: new Date(Date.now() - 345600000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const mockBudgets: BudgetWithProgress[] = [
  { id: '1', userId: '1', categoryId: 'food', amount: 15000, period: 'monthly', startDate: '2024-01-01', endDate: '2024-01-31', alertThreshold: 80, isActive: true, rollover: false, createdAt: '', updatedAt: '', spent: 8500, remaining: 6500, progress: 56.7, isOverBudget: false, daysRemaining: 15, categoryName: 'Food' },
  { id: '2', userId: '1', categoryId: 'shopping', amount: 10000, period: 'monthly', startDate: '2024-01-01', endDate: '2024-01-31', alertThreshold: 80, isActive: true, rollover: false, createdAt: '', updatedAt: '', spent: 9200, remaining: 800, progress: 92, isOverBudget: false, daysRemaining: 15, categoryName: 'Shopping' },
  { id: '3', userId: '1', categoryId: 'transport', amount: 5000, period: 'monthly', startDate: '2024-01-01', endDate: '2024-01-31', alertThreshold: 80, isActive: true, rollover: false, createdAt: '', updatedAt: '', spent: 2100, remaining: 2900, progress: 42, isOverBudget: false, daysRemaining: 15, categoryName: 'Transport' },
];

const mockAccounts: BankAccount[] = [
  { id: '1', userId: '1', bankId: 'hdfc', bankName: 'HDFC Bank', accountType: 'savings', accountNumber: '****5678', ifsc: 'HDFC0001234', balance: 125000, currency: 'INR', isActive: true, lastSyncedAt: new Date().toISOString(), createdAt: '' },
  { id: '2', userId: '1', bankId: 'icici', bankName: 'ICICI Bank', accountType: 'savings', accountNumber: '****9012', ifsc: 'ICIC0005678', balance: 87500, currency: 'INR', isActive: true, lastSyncedAt: new Date(Date.now() - 3600000).toISOString(), createdAt: '' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { transactions } = useTransactionStore();
  const { accounts } = useBankStore();
  const { budgets } = useBudgetStore();
  const [refreshing, setRefreshing] = useState(false);

  const totalBalance = accounts.reduce((sum: number, acc: BankAccount) => sum + acc.balance, 0);
  const monthlyIncome = transactions
    .filter((t: Transaction) => t.type === 'credit' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
  const monthlyExpense = transactions
    .filter((t: Transaction) => t.type === 'debit' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
  const savings = monthlyIncome - monthlyExpense;
  const savingsRate = monthlyIncome > 0 ? (savings / monthlyIncome) * 100 : 0;

  const recentTransactions = transactions.slice(0, 5);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#10B981']}
            progressBackgroundColor="#F8FAFC"
          />
        }
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Text style={styles.greetingText}>Good morning,</Text>
            <Text style={styles.nameText}>{user?.name?.split(' ')[0] || 'Rahul'}</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable style={styles.iconButton} onPress={() => router.push('/notifications' as any)}>
              <Bell size={24} color="#374151" />
            </Pressable>
            <Pressable style={styles.avatarButton} onPress={() => router.push('/profile' as any)}>
              <Avatar size="md" name={user?.name} fallback="R" />
            </Pressable>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Pressable style={styles.iconButton} onPress={() => router.push('/accounts' as any)}>
              <MoreHorizontal size={20} color="#fff" />
            </Pressable>
          </View>
          <Text style={styles.balanceAmount}>{formatCurrency(totalBalance)}</Text>
          <View style={styles.balanceChange}>
            <TrendingUp size={14} color="#22C55E" />
            <Text style={styles.balanceChangeText}>+2.4% this month</Text>
          </View>
        </View>

        <View style={styles.quickStats}>
          <Pressable style={styles.statCard} onPress={() => router.push('/analytics' as any)}>
            <View style={[styles.statIcon, styles.statIconIncome]}>
              <ArrowUpRight size={20} color="#22C55E" />
            </View>
            <View>
              <Text style={styles.statValue} numberOfLines={1}>{formatCurrency(monthlyIncome)}</Text>
              <Text style={styles.statLabel}>Income</Text>
            </View>
          </Pressable>
          <Pressable style={styles.statCard} onPress={() => router.push('/analytics' as any)}>
            <View style={[styles.statIcon, styles.statIconExpense]}>
              <ArrowDownRight size={20} color="#EF4444" />
            </View>
            <View>
              <Text style={styles.statValue} numberOfLines={1}>{formatCurrency(monthlyExpense)}</Text>
              <Text style={styles.statLabel}>Expenses</Text>
            </View>
          </Pressable>
          <Pressable style={styles.statCard} onPress={() => router.push('/budget' as any)}>
            <View style={[styles.statIcon, styles.statIconSavings]}>
              <Wallet size={20} color="#10B981" />
            </View>
            <View>
              <Text style={styles.statValue} numberOfLines={1}>{formatCurrency(savings)}</Text>
              <Text style={styles.statLabel}>Savings ({savingsRate.toFixed(0)}%)</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Recent Transactions</Text>
          </View>
          <Pressable style={styles.seeAllButton} onPress={() => router.push('/transactions' as any)}>
            <Text style={styles.seeAllText}>See all</Text>
            <ChevronRight size={16} color="#71717A" />
          </Pressable>
        </View>

        {recentTransactions.length > 0 ? (
          <View style={styles.transactionList}>
            {recentTransactions.map((tx: Transaction, index: number) => (
              <TransactionCard
                key={tx.id}
                transaction={tx}
                variant="compact"
                onPress={() => router.push(`/transactions/${tx.id}` as any)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No transactions yet</Text>
            <Text style={styles.emptyDesc}>Connect your bank to see transactions</Text>
            <Button variant="primary" size="sm" onPress={() => router.push('/connect-bank' as any)}>
              Connect Bank
            </Button>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitleText}>Budget Overview</Text>
          <Pressable style={styles.seeAllButton} onPress={() => router.push('/budget' as any)}>
            <Text style={styles.seeAllText}>See all</Text>
            <ChevronRight size={16} color="#71717A" />
          </Pressable>
        </View>

        <View style={styles.budgetList}>
          {budgets.slice(0, 3).map((budget: BudgetWithProgress) => (
            <BudgetCard key={budget.id} budget={budget} variant="compact" />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitleText}>Connected Accounts</Text>
          <Pressable style={styles.seeAllButton} onPress={() => router.push('/accounts' as any)}>
            <Text style={styles.seeAllText}>Manage</Text>
            <ChevronRight size={16} color="#71717A" />
          </Pressable>
        </View>

        <View style={styles.accountList}>
          {accounts.map((account: BankAccount) => (
            <BankCard key={account.id} account={account} variant="list" showBalance />
          ))}
        </View>

        <View style={styles.quickActions}>
          <Pressable style={styles.actionButton} onPress={() => router.push('/add-transaction' as any)}>
            <View style={styles.actionIcon}>
              <Plus size={24} color="#10B981" />
            </View>
            <Text style={styles.actionText}>Add Transaction</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => router.push('/budget/create' as any)}>
            <View style={styles.actionIcon}>
              <Target size={24} color="#10B981" />
            </View>
            <Text style={styles.actionText}>Create Budget</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => router.push('/connect-bank' as any)}>
            <View style={styles.actionIcon}>
              <CreditCard size={24} color="#10B981" />
            </View>
            <Text style={styles.actionText}>Link Account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    flex: 1,
  },
  greetingText: {
    fontSize: 14,
    color: '#71717A',
    marginBottom: 2,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#09090B',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  avatarButton: {
    padding: 2,
  },
  balanceCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 24,
    backgroundColor: '#10B981',
    borderRadius: 20,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -1,
    marginBottom: 8,
  },
  balanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  balanceChangeText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
  },
  quickStats: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIconIncome: {
    backgroundColor: '#ECFDF5',
  },
  statIconExpense: {
    backgroundColor: '#FEF2F2',
  },
  statIconSavings: {
    backgroundColor: '#ECFDF5',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#09090B',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#71717A',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#09090B',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  transactionList: {
    paddingHorizontal: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    color: '#71717A',
    textAlign: 'center',
    marginBottom: 16,
  },
  budgetList: {
    paddingHorizontal: 12,
    gap: 12,
  },
  accountList: {
    paddingHorizontal: 12,
    gap: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 24,
    paddingBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flex: 1,
    maxWidth: 100,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
});
