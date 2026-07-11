'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Plus, Search, Filter, ChevronDown, ChevronUp, Calendar, CreditCard, Tag, ArrowDown, ArrowUp } from 'lucide-react-native';
import { TransactionCard } from '@/modules/transactions/components/TransactionCard';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Badge } from '@/shared/components/ui/Badge';
import { Input } from '@/shared/components/ui/Input';
import { formatDate, formatRelativeTime, getCategoryColor, sortBy, categories } from '@/shared/utils';
import { Transaction } from '@/shared/types';
import { useTransactionStore } from '@/modules/transactions/store/transactionStore';
import { useAuthStore } from '@/modules/auth/store/authStore';

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

      <View style={styles.searchSection}>
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={20} color="#71717A" />}
          rightElement={searchQuery && (
            <Pressable onPress={() => setSearchQuery('')}>
              <ChevronDown size={20} color="#71717A" />
            </Pressable>
          )}
        />
      </View>

      <Pressable onPress={() => setShowFilters(!showFilters)} style={styles.filterToggle}>
        <View style={styles.filterToggleContent}>
          <Filter size={18} color="#374151" />
          <Text style={styles.filterToggleText}>Filters</Text>
          {(selectedCategory || selectedType !== 'all') && (
            <Badge size="sm" variant="primary">
              {(selectedCategory ? 1 : 0) + (selectedType !== 'all' ? 1 : 0)}
            </Badge>
          )}
          <ChevronDown size={18} color="#71717A" style={{ transform: [{ rotate: showFilters ? '180deg' : '0deg' }] }} />
        </View>
      </Pressable>

      {showFilters && (
        <View style={styles.filtersPanel}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChips}>
              {categoryOptions.map((cat: any) => (
                <Pressable
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id === 'all' || cat.id === 'income' ? null : cat.id)}
                  style={[
                    styles.filterChip,
                    selectedCategory === cat.id && styles.filterChipActive,
                    cat.id === 'income' && selectedType === 'credit' && !selectedCategory && styles.filterChipActive,
                  ]}
                >
                  <Text style={[
                    styles.filterChipText,
                    (selectedCategory === cat.id || (cat.id === 'income' && selectedType === 'credit' && !selectedCategory)) && styles.filterChipTextActive,
                  ]}>
                    {cat.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Type</Text>
            <View style={styles.typeChips}>
              {(['all', 'credit', 'debit'] as const).map((type) => (
                <Pressable
                  key={type}
                  onPress={() => setSelectedType(type as 'all' | 'credit' | 'debit')}
                  style={[
                    styles.typeChip,
                    selectedType === type && styles.typeChipActive,
                  ]}
                >
                  <Text style={[
                    styles.typeChipText,
                    selectedType === type && styles.typeChipTextActive,
                  ]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Sort</Text>
            <View style={styles.sortRow}>
              <Pressable
                onPress={() => setSortOrder('desc')}
                style={[styles.sortButton, sortOrder === 'desc' && styles.sortButtonActive]}
              >
                <Text style={[styles.sortButtonText, sortOrder === 'desc' && styles.sortButtonTextActive]}>Newest</Text>
                <ArrowDown size={14} color={sortOrder === 'desc' ? '#fff' : '#71717A'} />
              </Pressable>
              <Pressable
                onPress={() => setSortOrder('asc')}
                style={[styles.sortButton, sortOrder === 'asc' && styles.sortButtonActive]}
              >
                <Text style={[styles.sortButtonText, sortOrder === 'asc' && styles.sortButtonTextActive]}>Oldest</Text>
                <ArrowUp size={14} color={sortOrder === 'asc' ? '#fff' : '#71717A'} />
              </Pressable>
            </View>
          </View>

          {(selectedCategory || selectedType !== 'all') && (
            <Pressable onPress={() => { setSelectedCategory(null); setSelectedType('all'); }} style={styles.clearFilters}>
              <Text style={styles.clearFiltersText}>Clear all filters</Text>
            </Pressable>
          )}
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {transactions.length > 0 ? (
          transactions.map((tx: Transaction, index: number) => (
            <TransactionCard
              key={tx.id}
              transaction={tx}
              variant="list"
              onPress={() => router.push(`/transactions/${tx.id}` as any)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No transactions found</Text>
            <Text style={styles.emptyDesc}>
              {searchQuery || selectedCategory || selectedType !== 'all'
                ? 'Try adjusting your filters'
                : 'Connect your bank to see transactions'}
            </Text>
            {!searchQuery && !selectedCategory && selectedType === 'all' && (
              <Button variant="primary" size="md" onPress={() => router.push('/connect-bank' as any)}>
                Connect Bank
              </Button>
            )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 24,
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#71717A',
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#E4E4E7',
    marginHorizontal: 16,
  },
  searchSection: {
    padding: 16,
    paddingTop: 12,
    backgroundColor: '#F8FAFC',
  },
  filterToggle: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#F8FAFC',
  },
  filterToggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  filterToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  filtersPanel: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#F8FAFC',
    gap: 20,
  },
  filterGroup: {
    gap: 10,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  filterChips: {
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  filterChipActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  typeChips: {
    flexDirection: 'row',
    gap: 8,
  },
  typeChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    alignItems: 'center',
  },
  typeChipActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  typeChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  typeChipTextActive: {
    color: '#fff',
  },
  sortRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  sortButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  sortButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  sortButtonTextActive: {
    color: '#fff',
  },
  clearFilters: {
    paddingTop: 4,
  },
  clearFiltersText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#10B981',
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
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
});
