'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Plus, Search, Filter, ChevronDown, ChevronUp, Calendar, CreditCard, Tag, ArrowDown, ArrowUp } from 'lucide-react-native';
import { TransactionCard } from '@/modules/transactions/components/TransactionCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { formatDate, formatRelativeTime, getCategoryColor, sortBy, categories } from '@/utils';
import { Transaction } from '@/types';
import { useTransactionStore } from '@/modules/transactions/store/transactionStore';

const mockTransactions: Transaction[] = [
  { id: '1', userId: '1', accountId: '1', amount: 450, type: 'debit', category: 'food', merchant: 'Swiggy', description: 'Lunch order', date: new Date().toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', userId: '1', accountId: '1', amount: 25000, type: 'credit', category: 'income', merchant: 'Salary', description: 'Monthly salary', date: new Date(Date.now() - 86400000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', userId: '1', accountId: '1', amount: 1200, type: 'debit', category: 'shopping', merchant: 'Amazon', description: 'Electronics', date: new Date(Date.now() - 172800000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', userId: '1', accountId: '1', amount: 350, type: 'debit', category: 'transport', merchant: 'Uber', description: 'Ride to office', date: new Date(Date.now() - 259200000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '5', userId: '1', accountId: '1', amount: 899, type: 'debit', category: 'entertainment', merchant: 'Netflix', description: 'Subscription', date: new Date(Date.now() - 345600000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '6', userId: '1', accountId: '1', amount: 2100, type: 'debit', category: 'bills', merchant: 'Airtel', description: 'Mobile recharge', date: new Date(Date.now() - 432000000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '7', userId: '1', accountId: '1', amount: 1500, type: 'debit', category: 'healthcare', merchant: 'Apollo Pharmacy', description: 'Medicines', date: new Date(Date.now() - 518400000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '8', userId: '1', accountId: '1', amount: 50000, type: 'credit', category: 'income', merchant: 'Freelance', description: 'Project payment', date: new Date(Date.now() - 604800000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '9', userId: '1', accountId: '1', amount: 3200, type: 'debit', category: 'shopping', merchant: 'Myntra', description: 'Clothing', date: new Date(Date.now() - 691200000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '10', userId: '1', accountId: '1', amount: 180, type: 'debit', category: 'transport', merchant: 'Metro', description: 'Monthly pass', date: new Date(Date.now() - 800000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export default function TransactionsScreen() {
  const router = useRouter();
  const { transactions: storeTransactions } = useTransactionStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'credit' | 'debit'>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const allTx = [...mockTransactions, ...storeTransactions];
    let filtered = allTx;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tx => 
        tx.merchant?.toLowerCase().includes(query) ||
        tx.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(tx => tx.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(tx => tx.type === selectedType);
    }

    filtered = sortBy(filtered, 'date', sortOrder);
    setTransactions(filtered);
  }, [searchQuery, selectedCategory, selectedType, sortOrder, storeTransactions]);

  const categoryOptions = [
    { id: 'all', name: 'All Categories' },
    ...categories.filter((c: any) => c.type === 'expense').map((c: any) => ({ id: c.id, name: c.name })),
    { id: 'income', name: 'Income' },
  ];

  const totalIncome = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Transactions</Text>
        </View>
        <Pressable style={styles.addButton} onPress={() => router.push('/add-transaction' as any)}>
          <Plus size={20} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.summaryBar}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Income</Text>
          <Text style={[styles.summaryValue, { color: '#22C55E' }]}>₹{totalIncome.toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Expenses</Text>
          <Text style={[styles.summaryValue, { color: '#EF4444' }]}>₹{totalExpense.toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Net</Text>
          <Text style={[styles.summaryValue, { color: totalIncome >= totalExpense ? '#22C55E' : '#EF4444' }]}>
            {totalIncome >= totalExpense ? '+' : ''}₹{(totalIncome - totalExpense).toLocaleString('en-IN')}
          </Text>
        </View>
      </View>

      <View style={styles.filterBar}>
        <View style={styles.searchWrapper}>
          <Search size={20} color="#71717A" style={styles.searchIcon} />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            placeholderTextColor="#71717A"
          />
        </View>
        <Pressable onPress={() => setShowFilters(!showFilters)} style={styles.filterButton}>
          <Filter size={20} color="#374151" />
        </Pressable>
      </View>

      {showFilters && (
        <View style={styles.filtersPanel}>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Category</Text>
            <View style={styles.filterSelect}>
              <Text style={styles.filterSelectText}>
                {selectedCategory ? categoryOptions.find(c => c.id === selectedCategory)?.name : 'All Categories'}
              </Text>
              <ChevronDown size={16} color="#71717A" />
            </View>
          </View>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Type</Text>
            <View style={styles.filterSelect}>
              <Text style={styles.filterSelectText}>
                {selectedType === 'all' ? 'All' : selectedType === 'credit' ? 'Income' : 'Expense'}
              </Text>
              <ChevronDown size={16} color="#71717A" />
            </View>
          </View>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Sort</Text>
            <View style={styles.filterSelect}>
              <Text style={styles.filterSelectText}>
                {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
              </Text>
              <ChevronDown size={16} color="#71717A" />
            </View>
          </View>
        </View>
      )}

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await new Promise(resolve => setTimeout(resolve, 1000));
              setRefreshing(false);
            }}
            colors={['#10B981']}
            progressBackgroundColor="#F8FAFC"
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <CreditCard size={48} color="#71717A" />
            <Text style={styles.emptyTitle}>No transactions found</Text>
            <Text style={styles.emptyDesc}>Try adjusting your filters</Text>
          </View>
        ) : (
          <View style={styles.transactionsList}>
            {transactions.map((tx) => (
              <TransactionCard key={tx.id} transaction={tx} onPress={() => router.push(`/transactions/${tx.id}` as any)} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#09090B',
    letterSpacing: -0.5,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#71717A',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#09090B',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E4E4E7',
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginLeft: 4,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#09090B',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  filtersPanel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  filterSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 10,
  },
  filterSelectText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#09090B',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
  },
  transactionsList: {
    gap: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#09090B',
  },
  emptyDesc: {
    fontSize: 14,
    color: '#71717A',
  },
});