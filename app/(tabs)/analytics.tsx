'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Download, Filter, TrendingUp, TrendingDown, PieChart, BarChart2, DollarSign, Wallet, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Badge } from '@/shared/components/ui/Badge';
import { ProgressBar } from '@/shared/components/ui/ProgressBar';
import { formatCurrency, formatDate, getCategoryColor, categories } from '@/shared/utils';
import { CategoryBreakdown, MonthlyTrend, MerchantSpending } from '@/shared/types';

const mockCategoryBreakdown: CategoryBreakdown[] = [
  { categoryId: 'food', categoryName: 'Food', icon: 'Utensils', color: '#EF4444', amount: 15000, percentage: 30, transactionCount: 45, trend: 'up' },
  { categoryId: 'shopping', categoryName: 'Shopping', icon: 'ShoppingBag', color: '#EC4899', amount: 12000, percentage: 24, transactionCount: 18, trend: 'down' },
  { categoryId: 'transport', categoryName: 'Transport', icon: 'Car', color: '#3B82F6', amount: 8000, percentage: 16, transactionCount: 32, trend: 'stable' },
  { categoryId: 'bills', categoryName: 'Bills', icon: 'FileText', color: '#F59E0B', amount: 6000, percentage: 12, transactionCount: 8, trend: 'stable' },
  { categoryId: 'entertainment', categoryName: 'Entertainment', icon: 'Gamepad2', color: '#8B5CF6', amount: 4000, percentage: 8, transactionCount: 12, trend: 'up' },
  { categoryId: 'healthcare', categoryName: 'Healthcare', icon: 'HeartPulse', color: '#10B981', amount: 3000, percentage: 6, transactionCount: 5, trend: 'down' },
  { categoryId: 'others', categoryName: 'Others', icon: 'MoreHorizontal', color: '#71717A', amount: 2000, percentage: 4, transactionCount: 8, trend: 'stable' },
];

const mockMonthlyTrends: MonthlyTrend[] = [
  { month: 'Aug', income: 75000, expense: 45000, net: 30000 },
  { month: 'Sep', income: 80000, expense: 50000, net: 30000 },
  { month: 'Oct', income: 78000, expense: 52000, net: 26000 },
  { month: 'Nov', income: 82000, expense: 48000, net: 34000 },
  { month: 'Dec', income: 85000, expense: 55000, net: 30000 },
  { month: 'Jan', income: 80000, expense: 50000, net: 30000 },
];

const mockTopMerchants: MerchantSpending[] = [
  { merchant: 'Swiggy', amount: 8500, transactionCount: 24, category: 'food' },
  { merchant: 'Amazon', amount: 7200, transactionCount: 12, category: 'shopping' },
  { merchant: 'Uber', amount: 4500, transactionCount: 18, category: 'transport' },
  { merchant: 'Netflix', amount: 1798, transactionCount: 2, category: 'entertainment' },
  { merchant: 'Airtel', amount: 2100, transactionCount: 2, category: 'bills' },
];

export default function AnalyticsScreen() {
  const router = useRouter();
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  const totalIncome = mockMonthlyTrends.reduce((sum, m) => sum + m.income, 0);
  const totalExpense = mockMonthlyTrends.reduce((sum, m) => sum + m.expense, 0);
  const totalNet = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? (totalNet / totalIncome) * 100 : 0;
  const dailyAvg = totalExpense / 30;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>Your financial insights</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.iconButton}>
            <Filter size={22} color="#374151" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Download size={22} color="#374151" />
          </Pressable>
        </View>
      </View>

      <View style={styles.periodSelector}>
        {(['week', 'month', 'quarter', 'year'] as const).map((p) => (
          <Pressable
            key={p}
            onPress={() => setPeriod(p)}
            style={[
              styles.periodButton,
              period === p && styles.periodButtonActive,
            ]}
          >
            <Text style={[
              styles.periodButtonText,
              period === p && styles.periodButtonTextActive,
            ]}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCards}>
          <Card style={styles.summaryCard} padding="md">
            <View style={styles.summaryCardHeader}>
              <View style={styles.summaryIconIncome}>
                <ArrowUpRight size={20} color="#22C55E" />
              </View>
              <View>
                <Text style={styles.summaryCardLabel}>Total Income</Text>
                <Text style={styles.summaryCardValue}>{formatCurrency(totalIncome)}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.summaryCard} padding="md">
            <View style={styles.summaryCardHeader}>
              <View style={styles.summaryIconExpense}>
                <ArrowDownRight size={20} color="#EF4444" />
              </View>
              <View>
                <Text style={styles.summaryCardLabel}>Total Expenses</Text>
                <Text style={styles.summaryCardValue}>{formatCurrency(totalExpense)}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.summaryCard} padding="md">
            <View style={styles.summaryCardHeader}>
              <View style={styles.summaryIconNet}>
                <Wallet size={20} color="#10B981" />
              </View>
              <View>
                <Text style={styles.summaryCardLabel}>Net Savings</Text>
                <Text style={styles.summaryCardValue}>{totalNet >= 0 ? '+' : ''}{formatCurrency(totalNet)}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.summaryCard} padding="md">
            <View style={styles.summaryCardHeader}>
              <View style={styles.summaryIconSavings}>
                <DollarSign size={20} color="#10B981" />
              </View>
              <View>
                <Text style={styles.summaryCardLabel}>Savings Rate</Text>
                <Text style={styles.summaryCardValue}>{savingsRate.toFixed(1)}%</Text>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Spending by Category</Text>
            <Pressable style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>View Details</Text>
            </Pressable>
          </View>
          
          <View style={styles.pieChartContainer}>
            <View style={styles.pieChartLegend}>
              {mockCategoryBreakdown.slice(0, 5).map((cat) => (
                <View key={cat.categoryId} style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: cat.color }]} />
                  <View style={styles.legendInfo}>
                    <Text style={styles.legendName}>{cat.categoryName}</Text>
                    <Text style={styles.legendValue}>{formatCurrency(cat.amount)} ({cat.percentage}%)</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Monthly Trend</Text>
          </View>
          
          <View style={styles.barChartContainer}>
            {mockMonthlyTrends.map((month, index) => (
              <View key={month.month} style={styles.barGroup}>
                <View style={styles.barWrapper}>
                  <View style={[
                    styles.bar,
                    { height: Math.max((month.income / 85000) * 150, 4) },
                    styles.barIncome,
                  ]} />
                </View>
                <View style={styles.barWrapper}>
                  <View style={[
                    styles.bar,
                    { height: Math.max((month.expense / 55000) * 150, 4) },
                    styles.barExpense,
                  ]} />
                </View>
                <Text style={styles.barLabel}>{month.month}</Text>
              </View>
            ))}
            <View style={styles.chartLegend}>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, styles.barIncome]} />
                <Text style={styles.legendText}>Income</Text>
                <View style={[styles.legendDot, styles.barExpense]} />
                <Text style={styles.legendText}>Expenses</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Merchants</Text>
          </View>
          <Card padding="none">
            {mockTopMerchants.map((merchant, index) => (
              <View key={merchant.merchant} style={[
                styles.merchantRow,
                index === mockTopMerchants.length - 1 && styles.merchantRowLast,
              ]}>
                <View style={styles.merchantRank}>
                  <Text style={styles.merchantRankText}>#{index + 1}</Text>
                </View>
                <View style={styles.merchantInfo}>
                  <Text style={styles.merchantName}>{merchant.merchant}</Text>
                  <View style={styles.merchantMeta}>
                    <Badge size="sm" variant={merchant.category === 'food' ? 'expense' : merchant.category === 'shopping' ? 'warning' : 'info'}>
                      {categories.find((c) => c.id === merchant.category)?.name || merchant.category}
                    </Badge>
                    <Text style={styles.merchantCount}>{merchant.transactionCount} transactions</Text>
                  </View>
                </View>
                <Text style={styles.merchantAmount}>{formatCurrency(merchant.amount)}</Text>
              </View>
            ))}
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Category Breakdown</Text>
          </View>
          <Card padding="none">
            {mockCategoryBreakdown.map((cat, index) => (
              <View key={cat.categoryId} style={[
                styles.categoryRow,
                index === mockCategoryBreakdown.length - 1 && styles.categoryRowLast,
              ]}>
                <View style={styles.categoryInfo}>
                  <View style={[styles.categoryIcon, { backgroundColor: `${cat.color}20` }]}>
                    <Text style={styles.categoryIconText}>📦</Text>
                  </View>
                  <View>
                    <Text style={styles.categoryName}>{cat.categoryName}</Text>
                    <Text style={styles.categoryMeta}>{cat.transactionCount} transactions</Text>
                  </View>
                </View>
                <View style={styles.categoryStats}>
                  <Text style={styles.categoryAmount}>{formatCurrency(cat.amount)}</Text>
                  <ProgressBar
                    progress={cat.percentage}
                    height={4}
                    color={cat.color}
                    style={{ width: 80, marginLeft: 12 }}
                  />
                </View>
              </View>
            ))}
          </Card>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  subtitle: {
    fontSize: 14,
    color: '#71717A',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
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
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  periodButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  summaryCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    minWidth: '48%',
  },
  summaryCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  summaryIconIncome: {
    backgroundColor: '#ECFDF5',
  },
  summaryIconExpense: {
    backgroundColor: '#FEF2F2',
  },
  summaryIconNet: {
    backgroundColor: '#ECFDF5',
  },
  summaryIconSavings: {
    backgroundColor: '#EFF6FF',
  },
  summaryCardLabel: {
    fontSize: 12,
    color: '#71717A',
    fontWeight: '500',
    marginBottom: 4,
  },
  summaryCardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#09090B',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#09090B',
  },
  seeAllButton: {
    paddingVertical: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  pieChartContainer: {
    height: 180,
    justifyContent: 'center',
  },
  pieChartLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: '45%',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  legendInfo: {
    flex: 1,
  },
  legendName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  legendValue: {
    fontSize: 11,
    color: '#71717A',
  },
  barChartContainer: {
    paddingVertical: 8,
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 150,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 16,
    borderRadius: 4,
    minHeight: 4,
  },
  barIncome: {
    backgroundColor: '#22C55E',
  },
  barExpense: {
    backgroundColor: '#EF4444',
  },
  barLabel: {
    fontSize: 10,
    color: '#71717A',
    marginTop: 8,
  },
  chartLegend: {
    marginTop: 16,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    justifyContent: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  merchantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  merchantRowLast: {
    borderBottomWidth: 0,
  },
  merchantRank: {
    width: 36,
    alignItems: 'center',
  },
  merchantRankText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#71717A',
  },
  merchantInfo: {
    flex: 1,
    gap: 4,
  },
  merchantName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#09090B',
  },
  merchantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  merchantCount: {
    fontSize: 12,
    color: '#71717A',
  },
  merchantAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
    marginLeft: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  categoryRowLast: {
    borderBottomWidth: 0,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIconText: {
    fontSize: 18,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#09090B',
  },
  categoryMeta: {
    fontSize: 12,
    color: '#71717A',
  },
  categoryStats: {
    alignItems: 'flex-end',
    minWidth: 120,
  },
  categoryAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#09090B',
    marginBottom: 4,
  },
});
