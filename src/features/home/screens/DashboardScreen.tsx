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
          <View style={styles.balanceStats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{savingsRate.toFixed(0)}%</Text>
              <Text style={styles.statLabel}>Savings Rate</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{formatCurrency(monthlyIncome)}</Text>
              <Text style={styles.statLabel}>Income</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{formatCurrency(monthlyExpense)}</Text>
              <Text style={styles.statLabel}>Expenses</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Accounts</Text>
            <Pressable onPress={() => router.push('/accounts' as any)} style={styles.seeAll}>
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={16} color="#71717A" />
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accountsScroll} contentContainerStyle={styles.accountsScrollContent}>
            {accounts.map((account) => (
              <BankCard key={account.id} account={account} onPress={() => router.push(`/accounts/${account.id}` as any)} />
            ))}
            <Pressable style={styles.addAccountCard} onPress={() => router.push('/settings/banks' as any)}>
              <View style={styles.addAccountIcon}>
                <Plus size={24} color="#10B981" />
              </View>
              <Text style={styles.addAccountText}>Add Account</Text>
            </Pressable>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Budgets</Text>
            <Pressable onPress={() => router.push('/budgets' as any)} style={styles.seeAll}>
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={16} color="#71717A" />
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.budgetsScroll} contentContainerStyle={styles.budgetsScrollContent}>
            {budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} onPress={() => router.push(`/budgets/${budget.id}` as any)} />
            ))}
            <Pressable style={styles.addBudgetCard} onPress={() => router.push('/budgets/new' as any)}>
              <View style={styles.addBudgetIcon}>
                <Plus size={24} color="#10B981" />
              </View>
              <Text style={styles.addBudgetText}>Create Budget</Text>
            </Pressable>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <Pressable onPress={() => router.push('/transactions' as any)} style={styles.seeAll}>
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={16} color="#71717A" />
            </Pressable>
          </View>
          <View style={styles.transactionsList}>
            {recentTransactions.map((tx) => (
              <TransactionCard key={tx.id} transaction={tx} onPress={() => router.push(`/transactions/${tx.id}` as any)} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.quickActions}>
            <Pressable style={styles.actionCard} onPress={() => router.push('/transactions/add' as any)}>
              <View style={styles.actionIcon}><Plus size={24} color="#fff" /></View>
              <Text style={styles.actionTitle}>Add Transaction</Text>
              <Text style={styles.actionDesc}>Manually add income or expense</Text>
            </Pressable>
            <Pressable style={styles.actionCard} onPress={() => router.push('/budgets/new' as any)}>
              <View style={[styles.actionIcon, { backgroundColor: '#8B5CF6' }]}><Target size={24} color="#fff" /></View>
              <Text style={styles.actionTitle}>Create Budget</Text>
              <Text style={styles.actionDesc}>Set spending limits</Text>
            </Pressable>
            <Pressable style={styles.actionCard} onPress={() => router.push('/settings/banks' as any)}>
              <View style={[styles.actionIcon, { backgroundColor: '#F59E0B' }]}><CreditCard size={24} color="#fff" /></View>
              <Text style={styles.actionTitle}>Link Bank</Text>
              <Text style={styles.actionDesc}>Connect your bank accounts</Text>
            </Pressable>
            <Pressable style={styles.actionCard} onPress={() => router.push('/analytics' as any)}>
              <View style={[styles.actionIcon, { backgroundColor: '#EC4899' }]}><TrendingUp size={24} color="#fff" /></View>
              <Text style={styles.actionTitle}>View Analytics</Text>
              <Text style={styles.actionDesc}>Spending insights & trends</Text>
            </Pressable>
          </View>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
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
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarButton: {
    padding: 2,
  },
  balanceCard: {
    backgroundColor: '#10B981',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -1,
    marginBottom: 24,
  },
  balanceStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#09090B',
    letterSpacing: -0.5,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  accountsScroll: {
    marginHorizontal: -20,
  },
  accountsScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  addAccountCard: {
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E4E4E7',
    borderStyle: 'dashed',
    borderRadius: 16,
    gap: 8,
  },
  addAccountIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAccountText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  budgetsScroll: {
    marginHorizontal: -20,
  },
  budgetsScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  addBudgetCard: {
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E4E4E7',
    borderStyle: 'dashed',
    borderRadius: 16,
    gap: 8,
  },
  addBudgetIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBudgetText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
    textAlign: 'center',
  },
  transactionsList: {
    gap: 8,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 16,
    gap: 10,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#09090B',
  },
  actionDesc: {
    fontSize: 12,
    color: '#71717A',
  },
});