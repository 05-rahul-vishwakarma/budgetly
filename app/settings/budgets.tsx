'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Switch, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Edit2, ChevronRight, AlertCircle, CheckCircle, Clock, Target, Bell } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

const mockBudgets = [
  { id: '1', name: 'Monthly Spending', period: 'monthly', amount: 50000, spent: 32450, categories: ['Food & Dining', 'Transport', 'Shopping'], alertAt: 80, alertEnabled: true },
  { id: '2', name: 'Groceries', period: 'monthly', amount: 15000, spent: 8234, categories: ['Food & Dining'], alertAt: 75, alertEnabled: true },
  { id: '3', name: 'Entertainment', period: 'monthly', amount: 5000, spent: 4500, categories: ['Entertainment'], alertAt: 90, alertEnabled: false },
];

export default function BudgetsScreen() {
  const router = useRouter();
  const [budgets, setBudgets] = useState(mockBudgets);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState<typeof budgets[0] | null>(null);
  const [formData, setFormData] = useState({ name: '', amount: '', period: 'monthly', alertAt: 80, alertEnabled: true, categories: [] as string[] });

  const handleBack = () => router.back();

  const handleAddBudget = () => {
    if (!formData.name.trim() || !formData.amount) return;
    const newBudget = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      period: formData.period,
      amount: parseInt(formData.amount),
      spent: 0,
      categories: formData.categories,
      alertAt: formData.alertAt,
      alertEnabled: formData.alertEnabled,
    };
    setBudgets([...budgets, newBudget]);
    setShowAddModal(false);
    resetForm();
  };

  const handleUpdateBudget = () => {
    if (!formData.name.trim() || !formData.amount || !editingBudget) return;
    setBudgets(budgets.map(b => b.id === editingBudget.id ? { ...b, name: formData.name.trim(), amount: parseInt(formData.amount), period: formData.period, alertAt: formData.alertAt, alertEnabled: formData.alertEnabled, categories: formData.categories } : b));
    setEditingBudget(null);
    setShowAddModal(false);
    resetForm();
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  const handleEdit = (budget: typeof budgets[0]) => {
    setEditingBudget(budget);
    setFormData({ name: budget.name, amount: budget.amount.toString(), period: budget.period, alertAt: budget.alertAt, alertEnabled: budget.alertEnabled, categories: budget.categories });
    setShowAddModal(true);
  };

  const resetForm = () => setFormData({ name: '', amount: '', period: 'monthly', alertAt: 80, alertEnabled: true, categories: [] });

  const getProgress = (budget: typeof budgets[0]) => budget.amount > 0 ? Math.min((budget.spent / budget.amount) * 100, 100) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeft size={24} color="#374151" />
      </Pressable>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Budgets</Text>
          <Text style={styles.subtitle}>Track and control your spending</Text>
        </View>

        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <CardTitle>Active Budgets</CardTitle>
              <CardDescription>{budgets.length} budget{budgets.length !== 1 ? 's' : ''} configured</CardDescription>
            </View>
            <Pressable onPress={() => { setEditingBudget(null); resetForm(); setShowAddModal(true); }} style={styles.addButton}>
              <Plus size={20} color="#fff" />
            </Pressable>
          </View>
          <CardContent style={styles.budgetList}>
            {budgets.map((budget) => {
              const progress = getProgress(budget);
              const isOver = progress >= 100;
              const isWarning = progress >= budget.alertAt && !isOver;
              return (
                <Pressable key={budget.id} onLongPress={() => handleEdit(budget)} style={[styles.budgetRow, isOver && styles.budgetRowOver]}>
                  <View style={styles.budgetMain}>
                    <View style={styles.budgetHeader}>
                      <Text style={styles.budgetName}>{budget.name}</Text>
                      <Badge variant={isOver ? 'error' : isWarning ? 'warning' : 'success'}>
                        {isOver ? 'Over Budget' : isWarning ? 'Warning' : 'On Track'}
                      </Badge>
                    </View>
                    <View style={styles.budgetProgressContainer}>
                      <View style={styles.budgetProgressBar}>
                        <View style={[styles.budgetProgressFill, { width: `${progress}%`, backgroundColor: isOver ? '#EF4444' : isWarning ? '#F59E0B' : '#10B981' }]} />
                      </View>
                      <Text style={[styles.budgetAmount, isOver && styles.budgetAmountOver]}>
                        ₹{budget.spent.toLocaleString()} / ₹{budget.amount.toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.budgetMeta}>
                      <Text style={styles.budgetMetaItem}>
                        <Clock size={12} color="#71717A" style={{ marginRight: 4 }} /> {budget.period.charAt(0).toUpperCase() + budget.period.slice(1)}
                      </Text>
                      {budget.alertEnabled && (
                        <Text style={styles.budgetMetaItem}>
                          <Bell size={12} color="#71717A" style={{ marginRight: 4 }} /> Alert at {budget.alertAt}%
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.budgetActions}>
                    <Pressable onPress={() => handleEdit(budget)} style={styles.actionButton}>
                      <Edit2 size={16} color="#71717A" />
                    </Pressable>
                    <Pressable onPress={() => handleDeleteBudget(budget.id)} style={[styles.actionButton, styles.actionButtonDanger]}>
                      <Trash2 size={16} color="#EF4444" />
                    </Pressable>
                    <ChevronRight size={16} color="#71717A" />
                  </View>
                </Pressable>
              );
            })}
            {budgets.length === 0 && (
              <View style={styles.emptyState}>
                <Target size={48} color="#71717A" style={{ marginBottom: 12 }} />
                <Text style={styles.emptyTitle}>No Budgets Yet</Text>
                <Text style={styles.emptyDesc}>Create your first budget to start tracking</Text>
                <Pressable onPress={() => { setEditingBudget(null); resetForm(); setShowAddModal(true); }} style={styles.emptyButton}>
                  <Plus size={18} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.emptyButtonText}>Create Budget</Text>
                </Pressable>
              </View>
            )}
          </CardContent>
        </Card>

        <View style={styles.section}>
          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Budget Tips</CardTitle>
              <CardDescription>Make the most of your budgets</CardDescription>
            </CardHeader>
            <CardContent>
              <View style={styles.tipList}>
                {[
                  { icon: Target, title: '50/30/20 Rule', desc: '50% needs, 30% wants, 20% savings' },
                  { icon: AlertCircle, title: 'Set Alert Thresholds', desc: 'Get notified at 75%, 90% of budget' },
                  { icon: CheckCircle, title: 'Review Monthly', desc: 'Adjust budgets based on actual spending' },
                  { icon: Clock, title: 'Track Weekly', desc: 'Check progress weekly to stay on track' },
                ].map((tip, i) => (
                  <View key={i} style={styles.tipItem}>
                    <View style={styles.tipIcon}><tip.icon size={20} color="#10B981" /></View>
                    <View>
                      <Text style={styles.tipTitle}>{tip.title}</Text>
                      <Text style={styles.tipDesc}>{tip.desc}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>

      <Modal visible={showAddModal} animationType="slide" transparent={true}>
        <Pressable onPress={() => { setShowAddModal(false); setEditingBudget(null); resetForm(); }} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingBudget ? 'Edit Budget' : 'Create Budget'}</Text>
              <Pressable onPress={() => { setShowAddModal(false); setEditingBudget(null); resetForm(); }} style={styles.modalClose}><X size={24} color="#71717A" /></Pressable>
            </View>
            <View style={styles.modalBody}>
              <Input label="Budget Name" placeholder="e.g., Monthly Spending" value={formData.name} onChangeText={(v) => setFormData({ ...formData, name: v })} autoFocus />
              <Input label="Amount" placeholder="50000" value={formData.amount} onChangeText={(v) => setFormData({ ...formData, amount: v })} keyboardType="numeric" />
              <Text style={styles.modalSectionTitle}>Period</Text>
              <View style={styles.periodOptions}>
                {['weekly', 'monthly', 'yearly'].map((p) => (
                  <Pressable key={p} onPress={() => setFormData({ ...formData, period: p })} style={[styles.periodOption, formData.period === p && styles.periodOptionSelected]}>
                    <Text style={[styles.periodOptionText, formData.period === p && styles.periodOptionTextSelected]}>{p.charAt(0).toUpperCase() + p.slice(1)}</Text>
                  </Pressable>
                ))}
              </View>
              <View style={styles.alertRow}>
                <View style={styles.alertInfo}>
                  <Text style={styles.alertTitle}>Alert Threshold</Text>
                  <Text style={styles.alertSubtitle}>Notify me when I reach</Text>
                </View>
                <View style={styles.alertControl}>
                  <Text style={styles.alertValue}>{formData.alertAt}%</Text>
                  <View style={styles.alertSlider}>
                    {[50, 60, 70, 75, 80, 85, 90, 95, 100].map((v) => (
                      <Pressable key={v} onPress={() => setFormData({ ...formData, alertAt: v })} style={[styles.sliderDot, formData.alertAt === v && styles.sliderDotActive]} />
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Enable Alerts</Text>
                  <Text style={styles.settingSubtitle}>Get push notifications</Text>
                </View>
                <Switch value={formData.alertEnabled} onValueChange={(v) => setFormData({ ...formData, alertEnabled: v })} trackColor={{ false: '#E4E4E7', true: '#10B981' }} />
              </View>
              <Text style={styles.modalSectionTitle}>Categories (Optional)</Text>
              <View style={styles.categoryChips}>
                {['Food & Dining', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Healthcare', 'Education', 'Travel'].map((cat) => (
                  <Pressable key={cat} onPress={() => setFormData({ ...formData, categories: formData.categories.includes(cat) ? formData.categories.filter(c => c !== cat) : [...formData.categories, cat] })} style={[styles.categoryChip, formData.categories.includes(cat) && styles.categoryChipSelected]}>
                    <Text style={[styles.categoryChipText, formData.categories.includes(cat) && styles.categoryChipTextSelected]}>{cat}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={styles.modalFooter}>
              <Button variant="outline" onPress={() => { setShowAddModal(false); setEditingBudget(null); resetForm(); }}>Cancel</Button>
              <Button onPress={editingBudget ? handleUpdateBudget : handleAddBudget}>{editingBudget ? 'Save Changes' : 'Create Budget'}</Button>
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  backButton: { position: 'absolute', top: 8, left: 8, zIndex: 10, padding: 8 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32, gap: 16 },
  header: { marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#71717A', marginTop: 4 },
  card: { marginBottom: 8 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  addButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#10B981', justifyContent: 'center', alignItems: 'center' },
  budgetList: { gap: 0 },
  budgetRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E4E4E7' },
  budgetRowOver: { backgroundColor: '#FEF2F2' },
  budgetMain: { flex: 1, minWidth: 0 },
  budgetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 },
  budgetName: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  budgetProgressContainer: { gap: 8 },
  budgetProgressBar: { height: 8, backgroundColor: '#E4E4E7', borderRadius: 4, overflow: 'hidden' },
  budgetProgressFill: { height: '100%', borderRadius: 4 },
  budgetAmount: { fontSize: 13, fontWeight: '500', color: '#374151' },
  budgetAmountOver: { color: '#EF4444' },
  budgetMeta: { flexDirection: 'row', gap: 16, marginTop: 8 },
  budgetMetaItem: { fontSize: 12, color: '#71717A', flexDirection: 'row', alignItems: 'center' },
  budgetActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionButton: { padding: 8, borderRadius: 8 },
  actionButtonDanger: { backgroundColor: '#FEF2F2' },
  emptyState: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#09090B' },
  emptyDesc: { fontSize: 14, color: '#71717A', textAlign: 'center' },
  emptyButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#10B981', borderRadius: 12 },
  emptyButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  section: { marginTop: 8 },
  tipList: { gap: 16 },
  tipItem: { flexDirection: 'row', gap: 12 },
  tipIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  tipTitle: { fontSize: 14, fontWeight: '600', color: '#09090B' },
  tipDesc: { fontSize: 13, color: '#71717A', marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#09090B' },
  modalClose: { padding: 8 },
  modalBody: { gap: 20, marginBottom: 24 },
  modalSectionTitle: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 12 },
  periodOptions: { flexDirection: 'row', gap: 8 },
  periodOption: { flex: 1, paddingVertical: 12, borderRadius: 10, backgroundColor: '#F8FAFC', borderWidth: 2, borderColor: '#E4E4E7', alignItems: 'center' },
  periodOptionSelected: { borderColor: '#10B981', backgroundColor: '#ECFDF5' },
  periodOptionText: { fontSize: 14, fontWeight: '500', color: '#374151' },
  periodOptionTextSelected: { color: '#10B981' },
  alertRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  alertInfo: { flex: 1 },
  alertTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  alertSubtitle: { fontSize: 13, color: '#71717A', marginTop: 2 },
  alertControl: { alignItems: 'flex-end', gap: 8 },
  alertValue: { fontSize: 18, fontWeight: '700', color: '#10B981' },
  alertSlider: { flexDirection: 'row', gap: 6 },
  sliderDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#F8FAFC', borderWidth: 2, borderColor: '#E4E4E7', justifyContent: 'center', alignItems: 'center' },
  sliderDotActive: { backgroundColor: '#10B981', borderColor: '#10B981' },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  settingInfo: { flex: 1 },
  settingTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  settingSubtitle: { fontSize: 13, color: '#71717A', marginTop: 2 },
  categoryChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E4E4E7' },
  categoryChipSelected: { backgroundColor: '#10B981', borderColor: '#10B981' },
  categoryChipText: { fontSize: 13, fontWeight: '500', color: '#374151' },
  categoryChipTextSelected: { color: '#fff' },
  modalFooter: { flexDirection: 'row', gap: 12, justifyContent: 'flex-end' },
});

const { X } = require('lucide-react-native');