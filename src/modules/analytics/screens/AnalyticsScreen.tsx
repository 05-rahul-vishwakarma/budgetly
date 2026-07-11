'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, CreditCard, ArrowDownRight, ArrowUpRight, Menu, Filter, Calendar, PieChart, BarChart, Target, Shield } from 'lucide-react-native';
import { formatCurrency, formatDate, getCategoryColor, categories } from '@/shared/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Badge } from '@/shared/components/ui/Badge';
import { ProgressBar } from '@/shared/components/ui/ProgressBar';
import { Avatar } from '@/shared/components/ui/Avatar';

const categoryBreakdown = [
  { category: 'Food & Dining', amount: 15450, percentage: 32, color: '#EF4444' },
  { category: 'Transport', amount: 8200, percentage: 17, color: '#3B82F6' },
  { category: 'Shopping', amount: 12300, percentage: 25, color: '#8B5CF6' },
  { category: 'Entertainment', amount: 4500, percentage: 9, color: '#F59E0B' },
  { category: 'Bills', amount: 6800, percentage: 14, color: '#10B981' },
  { category: 'Healthcare', amount: 1500, percentage: 3, color: '#EC4899' },
];

const monthlyTrend = [
  { month: 'Jul', income: 85000, expense: 42000 },
  { month: 'Aug', income: 92000, expense: 48000 },
  { month: 'Sep', income: 78000, expense: 51000 },
  { month: 'Oct', income: 95000, expense: 45000 },
  { month: 'Nov', income: 88000, expense: 52000 },
  { month: 'Dec', income: 102000, expense: 58000 },
];

const topMerchants = [
  { name: 'Swiggy', amount: 8200, transactions: 12, category: 'Food' },
  { name: 'Amazon', amount: 12300, transactions: 8, category: 'Shopping' },
  { name: 'Uber', amount: 6500, transactions: 15, category: 'Transport' },
  { name: 'Netflix', amount: 499, transactions: 1, category: 'Entertainment' },
  { name: 'HDFC Bill', amount: 4500, transactions: 1, category: 'Bills' },
];

export default function AnalyticsScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const totalIncome = 102000;
  const totalExpense = 58000;
  const savings = totalIncome - totalExpense;
  const savingsRate = (savings / totalIncome) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Text style={styles.title}>Analytics</Text>
            <Text style={styles.subtitle}>Insights into your spending</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable style={styles.iconButton}>
              <Filter size={24} color="#374151" />
            </Pressable>
          </View>
        </View>

        <View style={styles.periodSelector}>
          {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
            <Pressable
              key={period}
              onPress={() => setSelectedPeriod(period)}
              style={[styles.periodButton, selectedPeriod === period && styles.periodButtonActive]}
            >
              <Text style={[styles.periodButtonText, selectedPeriod === period && styles.periodButtonTextActive]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={styles.summaryValueIncome}>{formatCurrency(totalIncome)}</Text>
            <Text style={styles.summaryChangePositive}>+12% vs last month</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={styles.summaryValueExpense}>{formatCurrency(totalExpense)}</Text>
            <Text style={styles.summaryChangeNegative}>+8% vs last month</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Savings</Text>
            <Text style={styles.summaryValueSavings}>{formatCurrency(savings)}</Text>
            <Text style={styles.summaryChangePositive}>{savingsRate.toFixed(0)}% savings rate</Text>
          </View>
        </View>

        <Card style={styles.card}>
          <CardHeader>
            <View style={styles.chartHeader}>
              <CardTitle>Category Breakdown</CardTitle>
              <View style={styles.chartLegend}>
                {categoryBreakdown.map((cat) => (
                  <View key={cat.category} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: cat.color }]} />
                    <Text style={styles.legendText}>{cat.category}</Text>
                    <Text style={styles.legendPercent}>{cat.percentage}%</Text>
                  </View>
                ))}
              </View>
            </View>
          </CardHeader>
          <CardContent>
            <View style={styles.pieChartPlaceholder}>
              <Text style={styles.chartPlaceholderText}>📊 Pie Chart Visualization</Text>
              <Text style={styles.chartPlaceholderSub}>Spending by category</Text>
            </View>
            <View style={styles.categoryList}>
              {categoryBreakdown.map((cat) => (
                <View key={cat.category} style={styles.categoryRow}>
                  <View style={styles.categoryInfo}>
                    <View style={[styles.categoryDot, { backgroundColor: cat.color }]} />
                    <View>
                      <Text style={styles.categoryName}>{cat.category}</Text>
                      <Text style={styles.categoryAmount}>{formatCurrency(cat.amount)}</Text>
                    </View>
                  </View>
                  <View style={styles.categoryRight}>
                    <Text style={styles.categoryPercent}>{cat.percentage}%</Text>
                    <ProgressBar progress={cat.percentage / 100} height={6} color={cat.color} />
                  </View>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>Income vs Expenses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.barChartPlaceholder}>
              <Text style={styles.chartPlaceholderText}>📈 Bar Chart Visualization</Text>
              <Text style={styles.chartPlaceholderSub}>6-month income vs expense trend</Text>
            </View>
            <View style={styles.trendList}>
              {monthlyTrend.map((month) => (
                <View key={month.month} style={styles.trendRow}>
                  <Text style={styles.trendMonth}>{month.month}</Text>
                  <View style={styles.trendBars}>
                    <View style={styles.trendBarIncome}>
                      <View style={[styles.trendBarFill, { width: `${(month.income / 102000) * 100}%`, backgroundColor: '#10B981' }]} />
                    </View>
                    <View style={styles.trendBarExpense}>
                      <View style={[styles.trendBarFill, { width: `${(month.expense / 102000) * 100}%`, backgroundColor: '#EF4444' }]} />
                    </View>
                  </View>
                  <View style={styles.trendValues}>
                    <Text style={styles.trendValueIncome}>{formatCurrency(month.income)}</Text>
                    <Text style={styles.trendValueExpense}>{formatCurrency(month.expense)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Top Merchants</CardTitle>
            <CardDescription>Where you spend the most</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.merchantList}>
              {topMerchants.map((merchant, index) => (
                <Pressable key={merchant.name} style={styles.merchantRow}>
                  <View style={styles.merchantRank}>{index + 1}</View>
                  <View style={styles.merchantInfo}>
                    <Text style={styles.merchantName}>{merchant.name}</Text>
                    <Text style={styles.merchantMeta}>{merchant.transactions} transactions · {merchant.category}</Text>
                  </View>
                  <Text style={styles.merchantAmount}>{formatCurrency(merchant.amount)}</Text>
                </Pressable>
              ))}
            </View>
          </CardContent>
        </Card>

        <View style={styles.section}>
          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Financial Health Score</CardTitle>
              <CardDescription>Your overall financial wellness</CardDescription>
            </CardHeader>
            <CardContent>
              <View style={styles.healthScore}>
                <View style={styles.healthCircle}>
                  <Text style={styles.healthScoreText}>87</Text>
                </View>
                <View style={styles.healthLabels}>
                  <View style={styles.healthItem}>
                    <Text style={styles.healthLabel}>Savings Rate</Text>
                    <Text style={styles.healthValue}>28%</Text>
                  </View>
                  <View style={styles.healthItem}>
                    <Text style={styles.healthLabel}>Debt Ratio</Text>
                    <Text style={styles.healthValue}>0%</Text>
                  </View>
                  <View style={styles.healthItem}>
                    <Text style={styles.healthLabel}>Emergency Fund</Text>
                    <Text style={styles.healthValue}>6 months</Text>
                  </View>
                </View>
              </View>
              <View style={styles.healthBadges}>
                <Badge variant="success">Excellent</Badge>
                <Badge variant="info">On Track</Badge>
                <Badge variant="warning">Review Budgets</Badge>
              </View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40, gap: 20 },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingTop: 16, paddingBottom: 8 },
  greeting: { flex: 1 },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5, marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#71717A' },
  headerActions: { flexDirection: 'row', gap: 12 },
  iconButton: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  periodSelector: { flexDirection: 'row', gap: 8, paddingHorizontal: 20 },
  periodButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E4E4E7' },
  periodButtonActive: { backgroundColor: '#10B981', borderColor: '#10B981' },
  periodButtonText: { fontSize: 13, fontWeight: '500', color: '#374151' },
  periodButtonTextActive: { color: '#fff' },
  summaryCards: { flexDirection: 'row', gap: 12, paddingHorizontal: 20 },
  summaryCard: { flex: 1, padding: 20, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#E4E4E7', gap: 8 },
  summaryLabel: { fontSize: 12, fontWeight: '500', color: '#71717A', textTransform: 'uppercase', letterSpacing: 0.5 },
  summaryValueIncome: { fontSize: 20, fontWeight: '700', color: '#10B981' },
  summaryValueExpense: { fontSize: 20, fontWeight: '700', color: '#EF4444' },
  summaryValueSavings: { fontSize: 20, fontWeight: '700', color: '#09090B' },
  summaryChangePositive: { fontSize: 11, fontWeight: '500', color: '#10B981' },
  summaryChangeNegative: { fontSize: 11, fontWeight: '500', color: '#EF4444' },
  card: { marginBottom: 8, marginHorizontal: 20 },
  chartHeader: { gap: 16 },
  chartLegend: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, fontWeight: '500', color: '#374151' },
  legendPercent: { fontSize: 12, fontWeight: '600', color: '#10B981' },
  pieChartPlaceholder: { alignItems: 'center', paddingVertical: 40, backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E4E4E7', borderStyle: 'dashed' },
  chartPlaceholderText: { fontSize: 18, fontWeight: '600', color: '#374151', marginBottom: 4 },
  chartPlaceholderSub: { fontSize: 13, color: '#71717A' },
  categoryList: { gap: 12, marginTop: 16 },
  categoryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  categoryInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  categoryDot: { width: 12, height: 12, borderRadius: 6 },
  categoryName: { fontSize: 14, fontWeight: '500', color: '#09090B' },
  categoryAmount: { fontSize: 12, color: '#71717A' },
  categoryRight: { alignItems: 'flex-end', minWidth: 80, gap: 4 },
  categoryPercent: { fontSize: 14, fontWeight: '600', color: '#10B981' },
  barChartPlaceholder: { alignItems: 'center', paddingVertical: 60, backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E4E4E7', borderStyle: 'dashed' },
  trendList: { gap: 16, marginTop: 16 },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  trendMonth: { width: 40, fontSize: 13, fontWeight: '600', color: '#374151' },
  trendBars: { flex: 1, flexDirection: 'row', gap: 8, height: 24 },
  trendBarIncome: { flex: 1, backgroundColor: '#E4E4E7', borderRadius: 12, overflow: 'hidden' },
  trendBarExpense: { flex: 1, backgroundColor: '#E4E4E7', borderRadius: 12, overflow: 'hidden' },
  trendBarFill: { height: '100%', borderRadius: 12 },
  trendValues: { width: 120, alignItems: 'flex-end', gap: 2 },
  trendValueIncome: { fontSize: 11, fontWeight: '600', color: '#10B981' },
  trendValueExpense: { fontSize: 11, fontWeight: '600', color: '#EF4444' },
  merchantList: { gap: 12 },
  merchantRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 12, gap: 12 },
  merchantRank: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  merchantRankText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  merchantInfo: { flex: 1, gap: 2 },
  merchantName: { fontSize: 15, fontWeight: '600', color: '#09090B' },
  merchantMeta: { fontSize: 12, color: '#71717A' },
  merchantAmount: { fontSize: 14, fontWeight: '600', color: '#EF4444' },
  section: { marginTop: 8, marginHorizontal: 20 },
  healthScore: { flexDirection: 'row', alignItems: 'center', gap: 24, paddingVertical: 8 },
  healthCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ECFDF5', borderWidth: 6, borderColor: '#10B981', justifyContent: 'center', alignItems: 'center' },
  healthScoreText: { fontSize: 24, fontWeight: '700', color: '#10B981' },
  healthLabels: { flex: 1, flexDirection: 'row', gap: 16 },
  healthItem: { flex: 1, gap: 2 },
  healthLabel: { fontSize: 11, color: '#71717A', textTransform: 'uppercase', letterSpacing: 0.5 },
  healthValue: { fontSize: 14, fontWeight: '600', color: '#09090B' },
  healthBadges: { flexDirection: 'row', gap: 8, marginTop: 16 },
});