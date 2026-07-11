'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Edit2, ChevronRight, Tag, Loader2, ArrowUpDown, Search } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Badge } from '@/shared/components/ui/Badge';

const defaultCategories = [
  { id: '1', name: 'Food & Dining', icon: '🍔', color: '#EF4444', budget: 15000, spent: 8234, isDefault: true },
  { id: '2', name: 'Transport', icon: '🚌', color: '#3B82F6', budget: 5000, spent: 3120, isDefault: true },
  { id: '3', name: 'Shopping', icon: '🛍️', color: '#8B5CF6', budget: 10000, spent: 4500, isDefault: true },
  { id: '4', name: 'Entertainment', icon: '🎮', color: '#F59E0B', budget: 5000, spent: 2100, isDefault: true },
  { id: '5', name: 'Bills & Utilities', icon: '📄', color: '#10B981', budget: 8000, spent: 6200, isDefault: true },
  { id: '6', name: 'Healthcare', icon: '🏥', color: '#EC4899', budget: 3000, spent: 800, isDefault: true },
  { id: '7', name: 'Education', icon: '📚', color: '#06B6D4', budget: 2000, spent: 0, isDefault: true },
  { id: '8', name: 'Travel', icon: '✈️', color: '#6366F1', budget: 15000, spent: 12000, isDefault: true },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState(defaultCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<typeof categories[0] | null>(null);
  const [formData, setFormData] = useState({ name: '', icon: '🏷️', color: '#10B981', budget: '' });

  const handleBack = () => router.back();

  const handleAddCategory = () => {
    if (!formData.name.trim()) return;
    const newCategory = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      icon: formData.icon,
      color: formData.color,
      budget: parseInt(formData.budget) || 0,
      spent: 0,
      isDefault: false,
    };
    setCategories([...categories, newCategory]);
    setShowAddModal(false);
    resetForm();
  };

  const handleUpdateCategory = () => {
    if (!formData.name.trim() || !editingCategory) return;
    setCategories(categories.map(c =>
      c.id === editingCategory.id ? { ...c, name: formData.name.trim(), icon: formData.icon, color: formData.color, budget: parseInt(formData.budget) || 0 } : c
    ));
    setEditingCategory(null);
    setShowAddModal(false);
    resetForm();
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const handleEdit = (cat: typeof categories[0]) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, icon: cat.icon, color: cat.color, budget: cat.budget.toString() });
    setShowAddModal(true);
  };

  const resetForm = () => setFormData({ name: '', icon: '🏷️', color: '#10B981', budget: '' });

  const getProgress = (cat: typeof categories[0]) => cat.budget > 0 ? Math.min((cat.spent / cat.budget) * 100, 100) : 0;

  const colors = ['#10B981', '#EF4444', '#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4', '#6366F1', '#F97316', '#22C55E'];
  const icons = ['🏷️', '🍔', '🚌', '🛍️', '🎮', '📄', '🏥', '📚', '✈️', '💰', '🏠', '🐕', '🎁', '💄', '🎓'];

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeft size={24} color="#374151" />
      </Pressable>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Categories</Text>
          <Text style={styles.subtitle}>Manage your spending categories</Text>
        </View>

        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <CardTitle>Your Categories</CardTitle>
              <CardDescription>{categories.length} categories • {categories.filter(c => !c.isDefault).length} custom</CardDescription>
            </View>
            <Pressable onPress={() => { setEditingCategory(null); resetForm(); setShowAddModal(true); }} style={styles.addButton}>
              <Plus size={20} color="#fff" />
            </Pressable>
          </View>
          <CardContent style={styles.categoryList}>
            {categories.map((cat) => (
              <Pressable key={cat.id} onLongPress={() => !cat.isDefault && handleEdit(cat)} style={styles.categoryRow}>
                <View style={[styles.categoryIcon, { backgroundColor: cat.color }]}>{cat.icon}</View>
                <View style={styles.categoryInfo}>
                  <View style={styles.categoryHeader}>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                    {cat.isDefault && <Badge variant="info">Default</Badge>}
                    {!cat.isDefault && <Badge variant="primary">Custom</Badge>}
                  </View>
                  {cat.budget > 0 && (
                    <View style={styles.budgetBar}>
                      <View style={[styles.budgetProgress, { width: `${getProgress(cat)}%`, backgroundColor: cat.color }]} />
                    </View>
                  )}
                  <Text style={styles.categoryMeta}>
                    {cat.budget > 0 ? `₹${cat.spent.toLocaleString()} / ₹${cat.budget.toLocaleString()}` : `₹${cat.spent.toLocaleString()} spent`}
                  </Text>
                </View>
                <View style={styles.categoryActions}>
                  {!cat.isDefault && (
                    <>
                      <Pressable onPress={() => handleEdit(cat)} style={styles.actionButton}>
                        <Edit2 size={16} color="#71717A" />
                      </Pressable>
                      <Pressable onPress={() => handleDeleteCategory(cat.id)} style={[styles.actionButton, styles.actionButtonDanger]}>
                        <Trash2 size={16} color="#EF4444" />
                      </Pressable>
                    </>
                  )}
                  <ChevronRight size={16} color="#71717A" />
                </View>
              </Pressable>
            ))}
          </CardContent>
        </Card>
      </ScrollView>

      <Modal visible={showAddModal} animationType="slide" transparent={true}>
        <Pressable onPress={() => { setShowAddModal(false); setEditingCategory(null); resetForm(); }} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingCategory ? 'Edit Category' : 'Add Category'}</Text>
              <Pressable onPress={() => { setShowAddModal(false); setEditingCategory(null); resetForm(); }} style={styles.modalClose}>
                <X size={24} color="#71717A" />
              </Pressable>
            </View>
            <View style={styles.modalBody}>
              <Input label="Category Name" placeholder="e.g., Groceries" value={formData.name} onChangeText={(v) => setFormData({ ...formData, name: v })} autoFocus />
              <Text style={styles.modalSectionTitle}>Icon</Text>
              <View style={styles.iconGrid}>
                {icons.map((icon) => (
                  <Pressable key={icon} onPress={() => setFormData({ ...formData, icon })} style={[styles.iconOption, formData.icon === icon && styles.iconOptionSelected]}>
                    <Text style={styles.iconOptionText}>{icon}</Text>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.modalSectionTitle}>Color</Text>
              <View style={styles.colorGrid}>
                {colors.map((color) => (
                  <Pressable key={color} onPress={() => setFormData({ ...formData, color })} style={[styles.colorOption, formData.color === color && styles.colorOptionSelected, { backgroundColor: color }]} />
                ))}
              </View>
              <Input label="Monthly Budget (Optional)" placeholder="0" value={formData.budget} onChangeText={(v) => setFormData({ ...formData, budget: v })} keyboardType="numeric" />
            </View>
            <View style={styles.modalFooter}>
              <Button variant="outline" onPress={() => { setShowAddModal(false); setEditingCategory(null); resetForm(); }}>Cancel</Button>
              <Button onPress={editingCategory ? handleUpdateCategory : handleAddCategory}>
                {editingCategory ? 'Save Changes' : 'Add Category'}
              </Button>
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
  categoryList: { gap: 0 },
  categoryRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E4E4E7' },
  categoryIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  categoryInfo: { flex: 1, marginLeft: 12, minWidth: 0 },
  categoryHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  categoryName: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  budgetBar: { height: 6, backgroundColor: '#E4E4E7', borderRadius: 3, marginTop: 8, overflow: 'hidden' },
  budgetProgress: { height: '100%', borderRadius: 3 },
  categoryMeta: { fontSize: 12, color: '#71717A', marginTop: 8 },
  categoryActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionButton: { padding: 8, borderRadius: 8 },
  actionButtonDanger: { backgroundColor: '#FEF2F2' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#09090B' },
  modalClose: { padding: 8 },
  modalBody: { gap: 20, marginBottom: 24 },
  modalSectionTitle: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 12 },
  iconGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  iconOption: { width: 52, height: 52, borderRadius: 12, backgroundColor: '#F8FAFC', borderWidth: 2, borderColor: '#E4E4E7', justifyContent: 'center', alignItems: 'center' },
  iconOptionSelected: { borderColor: '#10B981', backgroundColor: '#ECFDF5' },
  iconOptionText: { fontSize: 24 },
  colorGrid: { flexDirection: 'row', gap: 10 },
  colorOption: { width: 44, height: 44, borderRadius: 12, borderWidth: 3, borderColor: 'transparent' },
  colorOptionSelected: { borderColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  modalFooter: { flexDirection: 'row', gap: 12, justifyContent: 'flex-end' },
});

const { X } = require('lucide-react-native');