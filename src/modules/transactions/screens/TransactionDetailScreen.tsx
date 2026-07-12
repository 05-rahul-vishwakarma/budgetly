'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Alert, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { ArrowLeft, Edit2, Trash2, MoreHorizontal, Calendar, CreditCard, Tag, ArrowDown, ArrowUp, Tag as TagIcon, Shield, RefreshCw, Eye, EyeOff, ChevronRight, AlertCircle, X } from 'lucide-react-native';
import { TransactionCard } from '@/modules/transactions/components/TransactionCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { formatDate, formatRelativeTime, getCategoryColor, formatCurrency, categories } from '@/utils';
import { Transaction } from '@/types';
import { useTransactionStore } from '@/modules/transactions/store/transactionStore';

const mockTransactions: Transaction[] = [
  { id: '1', userId: '1', accountId: '1', amount: 450, type: 'debit', category: 'food', merchant: 'Swiggy', description: 'Lunch order', date: new Date().toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', userId: '1', accountId: '1', amount: 25000, type: 'credit', category: 'income', merchant: 'Salary', description: 'Monthly salary', date: new Date(Date.now() - 86400000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', userId: '1', accountId: '1', amount: 1200, type: 'debit', category: 'shopping', merchant: 'Amazon', description: 'Electronics', date: new Date(Date.now() - 172800000).toISOString(), status: 'completed', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export default function TransactionDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { transactions: storeTransactions } = useTransactionStore();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    type: 'debit' as 'debit' | 'credit',
    category: '',
    merchant: '',
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const allTx = [...mockTransactions, ...storeTransactions];
    const found = allTx.find(tx => tx.id === id);
    setTransaction(found || null);
    if (found) {
      setFormData({
        amount: found.amount.toString(),
        type: found.type,
        category: found.category,
        merchant: found.merchant || '',
        description: found.description,
      });
    }
  }, [id, storeTransactions]);

  if (!transaction) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Transaction not found</Text>
          <Pressable onPress={() => router.back()} style={styles.emptyBackButton}>
            <Text style={styles.emptyBackButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    setShowDeleteModal(false);
    router.back();
    Alert.alert('Deleted', 'Transaction has been deleted');
  };

  const handleEdit = async () => {
    if (!formData.amount || !formData.category) return;
    const updated: Transaction = {
      ...transaction,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      merchant: formData.merchant,
      description: formData.description,
      updatedAt: new Date().toISOString(),
    };
    setTransaction(updated);
    setShowEditModal(false);
    Alert.alert('Saved', 'Transaction updated successfully');
  };

  const isIncome = transaction.type === 'credit';
  const categoryColor = getCategoryColor(transaction.category);
  const categoryInfo = categories.find(c => c.id === transaction.category);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ArrowLeft size={24} color="#374151" />
        </Pressable>

        <View style={styles.header}>
          <View style={[styles.statusBadge, { backgroundColor: isIncome ? '#DCFCE7' : '#FEF2F2' }]}>
            <Text style={[styles.statusText, { color: isIncome ? '#166534' : '#991B1B' }]}>
              {isIncome ? 'Income' : 'Expense'}
            </Text>
          </View>
          <Text style={styles.amount}>{isIncome ? '+' : '-'}₹{formatCurrency(transaction.amount)}</Text>
          <Text style={styles.merchant}>{transaction.merchant || 'Unknown'}</Text>
          <Text style={styles.date}>{formatDate(transaction.date)} · {formatRelativeTime(transaction.date)}</Text>
        </View>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>Transaction information</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.detailGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Category</Text>
                <View style={styles.detailValueRow}>
                  <View style={[styles.categoryDot, { backgroundColor: categoryColor }]} />
                  <Text style={styles.detailValue}>{categoryInfo?.name || transaction.category}</Text>
                </View>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Account</Text>
                <Text style={styles.detailValue}>HDFC Bank **** 4242</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Status</Text>
                <View style={styles.detailValueRow}>
                  <Badge variant={transaction.status === 'completed' ? 'success' : 'warning'}>
                    {transaction.status}
                  </Badge>
                </View>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Transaction ID</Text>
                <Text style={styles.detailValue}>{transaction.id}</Text>
              </View>
            </View>

            {transaction.description && (
                <View>
                  <View style={styles.divider} />
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Description</Text>
                    <Text style={styles.detailValue}>{transaction.description}</Text>
                  </View>
                </View>
              )}

              {transaction.notes && (
                <View>
                  <View style={styles.divider} />
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Notes</Text>
                    <Text style={styles.detailValue}>{transaction.notes}</Text>
                  </View>
                </View>
              )}
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Manage this transaction</CardDescription>
          </CardHeader>
          <CardContent>
            <Pressable style={styles.actionRow} onPress={() => { setIsEditing(true); setShowEditModal(true); }}>
              <Edit2 size={20} color="#10B981" />
              <Text style={styles.actionText}>Edit Transaction</Text>
              <ChevronRight size={20} color="#71717A" />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={[styles.actionRow, styles.actionRowDanger]} onPress={() => setShowDeleteModal(true)}>
              <Trash2 size={20} color="#EF4444" />
              <Text style={[styles.actionText, { color: '#EF4444' }]}>Delete Transaction</Text>
            </Pressable>
          </CardContent>
        </Card>
      </ScrollView>

      <Modal visible={showDeleteModal} animationType="slide" transparent>
        <Pressable onPress={() => setShowDeleteModal(false)} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AlertCircle size={48} color="#EF4444" />
            <Text style={styles.modalTitle}>Delete Transaction</Text>
            <Text style={styles.modalDesc}>
              Are you sure you want to delete this {isIncome ? 'income' : 'expense'} of ₹{formatCurrency(transaction.amount)}?
              This action cannot be undone.
            </Text>
            <View style={styles.modalActions}>
              <Button variant="outline" onPress={() => setShowDeleteModal(false)}>Cancel</Button>
              <Button variant="danger" onPress={handleDelete}>Delete</Button>
            </View>
          </View>
        </Pressable>
      </Modal>

      <Modal visible={showEditModal} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
          keyboardVerticalOffset={0}
        >
          <ScrollView contentContainerStyle={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Transaction</Text>
              <Pressable onPress={() => setShowEditModal(false)} style={styles.modalClose}>
                <X size={24} color="#71717A" />
              </Pressable>
            </View>
            <View style={styles.modalBody}>
              <Input
                label="Amount"
                placeholder="0"
                value={formData.amount}
                onChangeText={(v) => setFormData({ ...formData, amount: v })}
                keyboardType="numeric"
                autoFocus
              />
              <View style={styles.typeSelector}>
                <Text style={styles.typeSelectorLabel}>Type</Text>
                <View style={styles.typeButtons}>
                  <Pressable
                    onPress={() => setFormData({ ...formData, type: 'credit' })}
                    style={[styles.typeButton, formData.type === 'credit' && styles.typeButtonActive]}
                  >
                    <Text style={[styles.typeButtonText, formData.type === 'credit' && styles.typeButtonTextActive]}>Income</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setFormData({ ...formData, type: 'debit' })}
                    style={[styles.typeButton, formData.type === 'debit' && styles.typeButtonActive]}
                  >
                    <Text style={[styles.typeButtonText, formData.type === 'debit' && styles.typeButtonTextActive]}>Expense</Text>
                  </Pressable>
                </View>
              </View>
              <Input
                label="Merchant"
                placeholder="e.g., Swiggy, Amazon"
                value={formData.merchant}
                onChangeText={(v) => setFormData({ ...formData, merchant: v })}
              />
              <Text style={styles.modalSectionTitle}>Category</Text>
              <View style={styles.categoryGrid}>
                {categories.map((cat) => (
                  <Pressable
                    key={cat.id}
                    onPress={() => setFormData({ ...formData, category: cat.id })}
                    style={[styles.categoryChip, formData.category === cat.id && styles.categoryChipSelected, { borderColor: cat.color }]}
                  >
                    <Text style={[styles.categoryChipText, formData.category === cat.id && styles.categoryChipTextSelected, { color: cat.color }]}>
                      {cat.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <Input
                label="Description (Optional)"
                placeholder="Additional details"
                value={formData.description}
                onChangeText={(v) => setFormData({ ...formData, description: v })}
                multiline
                numberOfLines={3}
              />
            </View>
            <View style={styles.modalActions}>
              <Button variant="outline" onPress={() => setShowEditModal(false)}>Cancel</Button>
              <Button onPress={handleEdit}>Save Changes</Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  backButton: { position: 'absolute', top: 8, left: 8, zIndex: 10, padding: 8 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40, gap: 16 },
  header: { alignItems: 'center', gap: 12, paddingHorizontal: 16 },
  statusBadge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 9999 },
  statusText: { fontSize: 14, fontWeight: '600', textTransform: 'capitalize' },
  amount: { fontSize: 36, fontWeight: '700', color: '#09090B' },
  merchant: { fontSize: 18, fontWeight: '500', color: '#374151' },
  date: { fontSize: 14, color: '#71717A' },
  card: { marginBottom: 8 },
  detailGrid: { gap: 16 },
  detailItem: { flex: 1, minWidth: '45%', gap: 4 },
  detailLabel: { fontSize: 12, fontWeight: '500', color: '#71717A', textTransform: 'uppercase', letterSpacing: 0.5 },
  detailValue: { fontSize: 15, fontWeight: '500', color: '#09090B' },
  detailValueRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  categoryDot: { width: 10, height: 10, borderRadius: 5 },
  divider: { height: 1, backgroundColor: '#E4E4E7', marginVertical: 8 },
  actionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  actionRowDanger: { backgroundColor: '#FEF2F2', marginTop: 8, borderRadius: 10 },
  actionText: { fontSize: 16, fontWeight: '500', color: '#09090B' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#09090B' },
  modalClose: { padding: 8 },
  modalBody: { gap: 20, marginBottom: 24 },
  modalSectionTitle: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 12 },
  typeSelector: { gap: 8 },
  typeSelectorLabel: { fontSize: 14, fontWeight: '500', color: '#374151' },
  typeButtons: { flexDirection: 'row', gap: 8 },
  typeButton: { flex: 1, paddingVertical: 12, borderRadius: 10, backgroundColor: '#F8FAFC', borderWidth: 2, borderColor: '#E4E4E7', alignItems: 'center' },
  typeButtonActive: { backgroundColor: '#ECFDF5', borderColor: '#10B981' },
  typeButtonText: { fontSize: 14, fontWeight: '500', color: '#374151' },
  typeButtonTextActive: { color: '#10B981' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E4E4E7' },
  categoryChipSelected: { backgroundColor: '#ECFDF5', borderWidth: 2 },
  categoryChipText: { fontSize: 13, fontWeight: '500', color: '#374151' },
  categoryChipTextSelected: { color: '#10B981' },
  modalActions: { flexDirection: 'row', gap: 12, justifyContent: 'flex-end' },
  modalActionsBottom: { flexDirection: 'row', gap: 12, justifyContent: 'flex-end', marginTop: 24 },
  modalOverlayFull: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modalContentFull: { backgroundColor: '#fff', borderRadius: 24, padding: 24, maxWidth: 400, width: '100%' },
  modalTitleFull: { fontSize: 20, fontWeight: '700', color: '#09090B' },
  modalDesc: { fontSize: 14, color: '#71717A', lineHeight: 20, marginTop: 8 },
  modalActionsFull: { flexDirection: 'row', gap: 12, justifyContent: 'flex-end', marginTop: 24 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#09090B' },
  emptyBackButton: { paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#10B981', borderRadius: 12 },
  emptyBackButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});