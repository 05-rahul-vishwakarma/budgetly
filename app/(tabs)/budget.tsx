'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Plus, Target, AlertCircle, CheckCircle, Clock, Calendar, Edit, Trash2, ChevronRight, ArrowLeft, DollarSign } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Badge } from '@/shared/components/ui/Badge';
import { ProgressBar } from '@/shared/components/ui/ProgressBar';
import { Input } from '@/shared/components/ui/Input';
import { formatCurrency, getCategoryColor, categories } from '@/shared/utils';
import { BudgetWithProgress } from '@/shared/types';
import { useBudgetStore } from '@/modules/budget/store/budgetStore';

const mockBudgets: BudgetWithProgress[] = [
  { id: '1', userId: '1', categoryId: 'food', amount: 15000, period: 'monthly', startDate: '2024-01-01', endDate: '2024-01-31', alertThreshold: 80, isActive: true, rollover: false, createdAt: '', updatedAt: '', spent: 8500, remaining: 6500, progress: 56.7, isOverBudget: false, daysRemaining: 15, categoryName: 'Food' },
  { id: '2', userId: '1', categoryId: 'shopping', amount: 10000, period: 'monthly', startDate: '2024-01-01', endDate: '2024-01-31', alertThreshold: 80, isActive: true, rollover: false, createdAt: '', updatedAt: '', spent: 9200, remaining: 800, progress: 92, isOverBudget: false, daysRemaining: 15, categoryName: 'Shopping' },
  { id: '3', userId: '1', categoryId: 'transport', amount: 5000, period: 'monthly', startDate: '2024-01-01', endDate: '2024-01-31', alertThreshold: 80, isActive: true, rollover: false, createdAt: '', updatedAt: '', spent: 2100, remaining: 2900, progress: 42, isOverBudget: false, daysRemaining: 15, categoryName: 'Transport' },
  { id: '4', userId: '1', categoryId: 'entertainment', amount: 3000, period: 'monthly', startDate: '2024-01-01', endDate: '2024-01-31', alertThreshold: 80, isActive: true, rollover: false, createdAt: '', updatedAt: '', spent: 1800, remaining: 1200, progress: 60, isOverBudget: false, daysRemaining: 15, categoryName: 'Entertainment' },
  { id: '5', userId: '1', categoryId: 'bills', amount: 8000, period: 'monthly', startDate: '2024-01-01', endDate: '2024-01-31', alertThreshold: 80, isActive: true, rollover: false, createdAt: '', updatedAt: '', spent: 8500, remaining: -500, progress: 106, isOverBudget: true, daysRemaining: 15, categoryName: 'Bills' },
];

export default function BudgetScreen() {
  const router = useRouter();
  const { budgets: storeBudgets } = useBudgetStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState<BudgetWithProgress | null>(null);
  const [formData, setFormData] = useState({
    categoryId: 'food',
    amount: '',
    period: 'monthly' as 'monthly' | 'weekly' | 'yearly',
    alertThreshold: 80,
    rollover: false,
  });

  const allBudgets = [...mockBudgets, ...storeBudgets];
  const activeBudgets = allBudgets.filter(b => b.isActive);
  const totalBudgeted = activeBudgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = activeBudgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;
  const overBudgetCount = activeBudgets.filter(b => b.isOverBudget).length;

  const handleSubmit = () => {
    if (!formData.categoryId || !formData.amount) return;
    
    const newBudget: BudgetWithProgress = {
      id: editingBudget?.id || Date.now().toString(),
      userId: '1',
      categoryId: formData.categoryId,
      amount: parseFloat(formData.amount),
      period: formData.period,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      alertThreshold: formData.alertThreshold,
      isActive: true,
      rollover: formData.rollover,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      spent: 0,
      remaining: parseFloat(formData.amount),
      progress: 0,
      isOverBudget: false,
      daysRemaining: 30,
      categoryName: categories.find((c) => c.id === formData.categoryId)?.name || formData.categoryId,
    };

    if (editingBudget) {
      // update
    } else {
      // create
    }
    
    resetForm();
    setShowCreateModal(false);
    setEditingBudget(null);
  };

  const resetForm = () => {
    setFormData({
      categoryId: 'food',
      amount: '',
      period: 'monthly',
      alertThreshold: 80,
      rollover: false,
    });
  };

  const handleEdit = (budget: BudgetWithProgress) => {
    setEditingBudget(budget);
    setFormData({
      categoryId: budget.categoryId,
      amount: budget.amount.toString(),
      period: budget.period,
      alertThreshold: budget.alertThreshold,
      rollover: budget.rollover,
    });
    setShowCreateModal(true);
  };

  const handleDelete = (id: string) => {
    alert('Delete budget?');
  };

  const expenseCategories = categories.filter((c) => c.type === 'expense');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Budgets</Text>
          <Text style={styles.subtitle}>{activeBudgets.length} active budgets</Text>
        </View>
        <Pressable style={styles.addButton} onPress={() => { resetForm(); setShowCreateModal(true); }}>
          <Plus size={20} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.overviewCard}>
        <View style={styles.overviewHeader}>
          <Text style={styles.overviewTitle}>This Month</Text>
          <Badge variant={overBudgetCount > 0 ? 'warning' : 'success'} size="sm">
            {overBudgetCount > 0 ? `${overBudgetCount} over budget` : 'All on track'}
          </Badge>
        </View>
        
        <View style={styles.overviewStats}>
          <View style={styles.overviewStat}>
            <Text style={styles.overviewStatLabel}>Budgeted</Text>
            <Text style={styles.overviewStatValue}>{formatCurrency(totalBudgeted)}</Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewStat}>
            <Text style={styles.overviewStatLabel}>Spent</Text>
            <Text style={[styles.overviewStatValue, { color: totalSpent > totalBudgeted ? '#EF4444' : '#09090B' }]}>
              {formatCurrency(totalSpent)}
            </Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewStat}>
            <Text style={styles.overviewStatLabel}>Remaining</Text>
            <Text style={[styles.overviewStatValue, { color: totalRemaining < 0 ? '#EF4444' : '#22C55E' }]}>
              {totalRemaining >= 0 ? '' : '-'}{formatCurrency(Math.abs(totalRemaining))}
            </Text>
          </View>
        </View>

        <ProgressBar
          progress={Math.min((totalSpent / totalBudgeted) * 100, 100)}
          height={8}
          color={totalSpent > totalBudgeted ? 'error' : 'primary'}
          rounded
        />
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Your Budgets</Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {activeBudgets.length > 0 ? (
          activeBudgets.map((budget) => (
            <Card key={budget.id} style={styles.budgetCard} padding="none" variant="outlined">
              <View style={styles.budgetCardContent}>
                <View style={styles.budgetMain}>
                  <View style={[styles.budgetIcon, { backgroundColor: `${getCategoryColor(budget.categoryId)}20` }]}>
                    <Text style={styles.budgetIconText}>📦</Text>
                  </View>
                  <View style={styles.budgetInfo}>
                    <View style={styles.budgetNameRow}>
                      <Text style={styles.budgetName}>{budget.categoryName}</Text>
                      <Badge size="sm" variant={budget.isOverBudget ? 'error' : budget.progress >= 80 ? 'warning' : 'success'}>
                        {budget.isOverBudget ? 'Over' : budget.progress >= 80 ? 'Near limit' : 'On track'}
                      </Badge>
                    </View>
                    <View style={styles.budgetAmountRow}>
                      <Text style={styles.budgetSpent}>{formatCurrency(budget.spent)}</Text>
                      <Text style={styles.budgetDivider}>/</Text>
                      <Text style={styles.budgetTotal}>{formatCurrency(budget.amount)}</Text>
                    </View>
                  </View>
                </View>
                <ProgressBar
                  progress={Math.min(budget.progress, 100)}
                  height={6}
                  color={budget.isOverBudget ? 'error' : budget.progress >= 80 ? 'warning' : 'primary'}
                  rounded
                  style={{ width: '100%', marginTop: 12 }}
                />
                <View style={styles.budgetFooter}>
                  <View style={styles.budgetDays}>
                    <Clock size={12} color="#71717A" />
                    <Text style={styles.budgetDaysText}>{budget.daysRemaining} days left</Text>
                  </View>
                  <View style={styles.budgetActions}>
                    <Pressable onPress={() => handleEdit(budget)} style={styles.budgetAction}>
                      <Edit size={16} color="#71717A" />
                    </Pressable>
                    <Pressable onPress={() => handleDelete(budget.id)} style={styles.budgetAction}>
                      <Trash2 size={16} color="#EF4444" />
                    </Pressable>
                  </View>
                </View>
              </View>
            </Card>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Target size={64} color="#71717A" />
            <Text style={styles.emptyTitle}>No budgets yet</Text>
            <Text style={styles.emptyDesc}>Create your first budget to start tracking your spending</Text>
            <Button variant="primary" onPress={() => { resetForm(); setShowCreateModal(true); }}>
              Create Budget
            </Button>
          </View>
        )}
      </ScrollView>

      <Modal visible={showCreateModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
            keyboardVerticalOffset={0}
          >
            <View style={styles.modalHeader}>
              <Pressable onPress={() => { setShowCreateModal(false); resetForm(); setEditingBudget(null); }} style={styles.modalClose}>
                <ArrowLeft size={24} color="#374151" />
              </Pressable>
              <Text style={styles.modalTitle}>{editingBudget ? 'Edit Budget' : 'Create Budget'}</Text>
              <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Category</Text>
                <View style={styles.categoryGrid}>
                  {expenseCategories.map((cat) => (
                    <Pressable
                      key={cat.id}
                      onPress={() => setFormData((prev) => ({ ...prev, categoryId: cat.id }))}
                      style={[
                        styles.categoryOption,
                        formData.categoryId === cat.id && styles.categoryOptionSelected,
                      ]}
                    >
                      <View style={[styles.categoryOptionIcon, { backgroundColor: `${cat.color}20` }]}>
                        <Text style={styles.categoryOptionIconText}>📦</Text>
                      </View>
                      <Text style={[
                        styles.categoryOptionName,
                        formData.categoryId === cat.id && styles.categoryOptionNameSelected,
                      ]}>
                        {cat.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Amount</Text>
                <Input
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChangeText={(value) => setFormData((prev) => ({ ...prev, amount: value }))}
                  keyboardType="numeric"
                  leftElement={<DollarSign size={20} color="#71717A" />}
                />
              </View>

              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Period</Text>
                <View style={styles.periodOptions}>
                  {(['monthly', 'weekly', 'yearly'] as const).map((period) => (
                    <Pressable
                      key={period}
                      onPress={() => setFormData((prev) => ({ ...prev, period }))}
                      style={[
                        styles.periodOption,
                        formData.period === period && styles.periodOptionSelected,
                      ]}
                    >
                      <Text style={[
                        styles.periodOptionText,
                        formData.period === period && styles.periodOptionTextSelected,
                      ]}>
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Alert Threshold</Text>
                <View style={styles.sliderContainer}>
                  <Input
                    placeholder="80"
                    value={formData.alertThreshold.toString()}
                    onChangeText={(value) => setFormData((prev) => ({ ...prev, alertThreshold: parseInt(value) || 0 }))}
                    keyboardType="numeric"
                    style={{ width: 80 }}
                  />
                  <Text style={styles.sliderLabel}>% of budget</Text>
                </View>
              </View>

              <View style={styles.modalField}>
                <Pressable onPress={() => setFormData((prev) => ({ ...prev, rollover: !prev.rollover }))} style={styles.toggleRow}>
                  <View style={[
                    styles.toggleTrack,
                    formData.rollover && styles.toggleTrackActive,
                  ]}>
                    <View style={[
                      styles.toggleThumb,
                      formData.rollover && styles.toggleThumbActive,
                    ]} />
                  </View>
                  <View style={styles.toggleLabel}>
                    <Text style={styles.toggleLabelText}>Rollover unused budget</Text>
                    <Text style={styles.toggleLabelDesc}>Carry forward remaining amount to next period</Text>
                  </View>
                </Pressable>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <Button variant="ghost" onPress={() => { setShowCreateModal(false); resetForm(); setEditingBudget(null); }}>
                Cancel
              </Button>
              <Button variant="primary" onPress={handleSubmit}>
                {editingBudget ? 'Save Changes' : 'Create Budget'}
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
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
  overviewCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  overviewStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  overviewStat: {
    flex: 1,
    alignItems: 'center',
  },
  overviewStatLabel: {
    fontSize: 12,
    color: '#71717A',
    fontWeight: '500',
    marginBottom: 4,
  },
  overviewStatValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  overviewDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E4E4E7',
  },
  listHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#09090B',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 100,
    gap: 12,
  },
  budgetCard: {
    marginHorizontal: 0,
  },
  budgetCardContent: {
    padding: 16,
  },
  budgetMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  budgetIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  budgetIconText: {
    fontSize: 20,
  },
  budgetInfo: {
    flex: 1,
    minWidth: 0,
  },
  budgetNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  budgetName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#09090B',
  },
  budgetAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  budgetSpent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#09090B',
  },
  budgetDivider: {
    fontSize: 14,
    color: '#71717A',
  },
  budgetTotal: {
    fontSize: 14,
    fontWeight: '500',
    color: '#71717A',
  },
  budgetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  budgetDays: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  budgetDaysText: {
    fontSize: 12,
    color: '#71717A',
  },
  budgetActions: {
    flexDirection: 'row',
    gap: 8,
  },
  budgetAction: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    color: '#71717A',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  modalClose: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#09090B',
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
    gap: 20,
  },
  modalField: {
    gap: 8,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  categoryOptionSelected: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
    borderWidth: 2,
  },
  categoryOptionIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryOptionIconText: {
    fontSize: 14,
  },
  categoryOptionName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  categoryOptionNameSelected: {
    color: '#10B981',
    fontWeight: '600',
  },
  periodOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  periodOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    alignItems: 'center',
  },
  periodOptionSelected: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
    borderWidth: 2,
  },
  periodOptionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  periodOptionTextSelected: {
    color: '#10B981',
    fontWeight: '600',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sliderLabel: {
    fontSize: 13,
    color: '#71717A',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  toggleTrack: {
    width: 52,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E4E4E7',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleTrackActive: {
    backgroundColor: '#10B981',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    marginLeft: 24,
  },
  toggleLabel: {
    flex: 1,
    marginLeft: 12,
  },
  toggleLabelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  toggleLabelDesc: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E4E4E7',
  },
});
