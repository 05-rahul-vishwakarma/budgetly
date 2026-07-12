'use client';

import { View, Text, Pressable, StyleSheet, KeyboardAvoidingView, Platform, Modal, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, Plus, Save, X, ChevronRight, Tag, CreditCard, Calendar, DollarSign, ArrowUp, ArrowDown, CheckCircle } from 'lucide-react-native';
import { useTransactionStore } from '@/modules/transactions/store/transactionStore';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { Transaction } from '@/types';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const categories = [
  { id: 'food', name: 'Food & Dining', icon: '🍔', color: '#EF4444', type: 'expense' },
  { id: 'transport', name: 'Transport', icon: '🚌', color: '#3B82F6', type: 'expense' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#8B5CF6', type: 'expense' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎮', color: '#F59E0B', type: 'expense' },
  { id: 'bills', name: 'Bills & Utilities', icon: '📄', color: '#10B981', type: 'expense' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: '#EC4899', type: 'expense' },
  { id: 'education', name: 'Education', icon: '📚', color: '#06B6D4', type: 'expense' },
  { id: 'travel', name: 'Travel', icon: '✈️', color: '#6366F1', type: 'expense' },
  { id: 'income', name: 'Income', icon: '💰', color: '#22C55E', type: 'income' },
];

export default function AddTransactionScreen() {
  const router = useRouter();
  const { addTransaction } = useTransactionStore();
  const { user } = useAuthStore();
  
  const [formData, setFormData] = useState({
    amount: '',
    type: 'debit' as 'credit' | 'debit',
    merchant: '',
    category: 'food',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!formData.amount || !formData.merchant || isLoading) return;
    
    setIsLoading(true);
    const transaction: Transaction = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user?.id || '1',
      accountId: '1',
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      merchant: formData.merchant,
      description: formData.description,
      date: new Date().toISOString(),
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await addTransaction(transaction);
    setIsLoading(false);
    setShowSuccess(true);
  };

  const handleBack = () => {
    if (showSuccess) {
      setShowSuccess(false);
      router.back();
    } else {
      router.back();
    }
  };

  if (showSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView} keyboardVerticalOffset={0}>
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <CheckCircle size={64} color="#10B981" />
            </View>
            <Text style={styles.successTitle}>Transaction Added!</Text>
            <Text style={styles.successDesc}>Your transaction has been recorded successfully.</Text>
            <Pressable onPress={handleBack} style={styles.doneButton}>
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={0}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ArrowLeft size={24} color="#374151" />
          </Pressable>

          <View style={styles.header}>
            <Text style={styles.title}>Add Transaction</Text>
            <Text style={styles.subtitle}>Record your income or expense</Text>
          </View>

          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                label="Amount"
                placeholder="0"
                value={formData.amount}
                onChangeText={(v) => setFormData({ ...formData, amount: v })}
                keyboardType="numeric"
                autoFocus
              />
            </CardContent>
          </Card>

          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Type</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={styles.typeSelector}>
                <Pressable
                  onPress={() => setFormData({ ...formData, type: 'credit' })}
                  style={[styles.typeButton, formData.type === 'credit' && styles.typeButtonActive]}
                >
                  <View style={styles.typeButtonIcon}><ArrowUp size={20} color={formData.type === 'credit' ? '#fff' : '#22C55E'} /></View>
                  <Text style={[styles.typeButtonText, formData.type === 'credit' && styles.typeButtonTextActive]}>Income</Text>
                </Pressable>
                <Pressable
                  onPress={() => setFormData({ ...formData, type: 'debit' })}
                  style={[styles.typeButton, formData.type === 'debit' && styles.typeButtonActive]}
                >
                  <View style={styles.typeButtonIcon}><ArrowDown size={20} color={formData.type === 'debit' ? '#fff' : '#EF4444'} /></View>
                  <Text style={[styles.typeButtonText, formData.type === 'debit' && styles.typeButtonTextActive]}>Expense</Text>
                </Pressable>
              </View>
            </CardContent>
          </Card>

          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Merchant</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                label="Merchant"
                placeholder="e.g., Swiggy, Amazon, Salary"
                value={formData.merchant}
                onChangeText={(v) => setFormData({ ...formData, merchant: v })}
              />
            </CardContent>
          </Card>

          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={styles.categoryGrid}>
                {categories
                  .filter(c => c.type === formData.type)
                  .map((cat) => (
                    <Pressable
                      key={cat.id}
                      onPress={() => setFormData({ ...formData, category: cat.id })}
                      style={[styles.categoryChip, formData.category === cat.id && styles.categoryChipSelected, { borderColor: cat.color }]}
                    >
                      <Text style={[styles.categoryChipText, formData.category === cat.id && styles.categoryChipTextSelected, { color: cat.color }]}>
                        {cat.icon} {cat.name}
                      </Text>
                    </Pressable>
                  ))}
              </View>
            </CardContent>
          </Card>

          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Description (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                label="Description"
                placeholder="Additional details..."
                value={formData.description}
                onChangeText={(v) => setFormData({ ...formData, description: v })}
                multiline
                numberOfLines={3}
              />
            </CardContent>
          </Card>

          <Pressable
            onPress={handleSubmit}
            disabled={!formData.amount || !formData.merchant || isLoading}
            style={[
              styles.submitButton,
              !formData.amount || !formData.merchant ? styles.submitButtonDisabled : {},
              isLoading && styles.submitButtonLoading,
            ]}
            android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
          >
            {isLoading ? (
              <Text style={styles.submitButtonText}>Adding...</Text>
            ) : (
              <>
                <Save size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.submitButtonText}>Add Transaction</Text>
              </>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  keyboardView: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32, gap: 16 },
  header: { alignItems: 'center', marginBottom: 8, gap: 8 },
  backButton: { position: 'absolute', top: 8, left: 8, zIndex: 10, padding: 8 },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#71717A' },
  card: { marginBottom: 8 },
  typeSelector: { flexDirection: 'row', gap: 12 },
  typeButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 14, backgroundColor: '#fff', borderWidth: 2, borderColor: '#E4E4E7' },
  typeButtonActive: { backgroundColor: '#ECFDF5', borderColor: '#10B981' },
  typeButtonIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  typeButtonIconActive: { backgroundColor: '#ECFDF5' },
  typeButtonText: { fontSize: 16, fontWeight: '600', color: '#374151' },
  typeButtonTextActive: { color: '#10B981' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E4E4E7' },
  categoryChipSelected: { backgroundColor: '#ECFDF5', borderWidth: 2 },
  categoryChipText: { fontSize: 13, fontWeight: '500', color: '#374151' },
  categoryChipTextSelected: { color: '#10B981' },
  submitButton: { paddingVertical: 16, borderRadius: 16, backgroundColor: '#10B981', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, shadowColor: '#10B981', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  submitButtonDisabled: { backgroundColor: '#93C5FD', shadowOpacity: 0, elevation: 0 },
  submitButtonLoading: { backgroundColor: '#059669' },
  submitButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  successContainer: { alignItems: 'center', paddingVertical: 40, gap: 16 },
  successIcon: { marginBottom: 8 },
  successTitle: { fontSize: 24, fontWeight: '700', color: '#09090B' },
  successDesc: { fontSize: 16, color: '#71717A', textAlign: 'center', lineHeight: 24, paddingHorizontal: 16 },
  doneButton: { paddingHorizontal: 32, paddingVertical: 16, backgroundColor: '#10B981', borderRadius: 16 },
  doneButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});