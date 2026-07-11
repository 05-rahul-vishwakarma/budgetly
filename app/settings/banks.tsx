'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Modal, Switch, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, Building, CreditCard, ChevronRight, Plus, Trash2, Check, AlertCircle, Link, X, Shield, AlertTriangle } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

const mockBanks = [
  { id: '1', name: 'HDFC Bank', logo: '🏦', status: 'connected', lastSync: '2 hours ago', accounts: 3, color: '#001F3F' },
  { id: '2', name: 'ICICI Bank', logo: '🏛️', status: 'connected', lastSync: '5 hours ago', accounts: 2, color: '#FF6B00' },
  { id: '3', name: 'SBI', logo: '🏦', status: 'error', lastSync: 'Failed 1 day ago', accounts: 1, color: '#0056A3' },
];

export default function ConnectedBanksScreen() {
  const router = useRouter();
  const [showAddBank, setShowAddBank] = useState(false);
  const [showRemoveBank, setShowRemoveBank] = useState<string | null>(null);
  const [banks, setBanks] = useState(mockBanks);

  const handleBack = () => router.back();

  const handleRemoveBank = (bankId: string) => {
    setBanks(banks.filter(b => b.id !== bankId));
    setShowRemoveBank(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeft size={24} color="#374151" />
      </Pressable>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Connected Banks</Text>
          <Text style={styles.subtitle}>Manage your bank connections</Text>
        </View>

        {banks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Connected Accounts</Text>
            <Card style={styles.card} padding="none" variant="outlined">
              {banks.map((bank, index) => (
                <View key={bank.id} style={[styles.bankRow, index > 0 && styles.dividerTop]}>
                  <View style={[styles.bankLogo, { backgroundColor: bank.color }]}>
                    <Text style={styles.bankLogoText}>{bank.logo}</Text>
                  </View>
                  <View style={styles.bankInfo}>
                    <Text style={styles.bankName}>{bank.name}</Text>
                    <View style={styles.bankMeta}>
                      <Text style={styles.bankMetaText}>{bank.accounts} account{bank.accounts > 1 ? 's' : ''}</Text>
                      <View style={styles.bankMetaDot} />
                      <Text style={[styles.bankMetaText, bank.status === 'connected' ? styles.metaSuccess : styles.metaError]}>
                        {bank.status === 'connected' ? 'Connected' : 'Sync Error'}
                      </Text>
                    </View>
                    <Text style={styles.bankLastSync}>{bank.lastSync}</Text>
                  </View>
                  <View style={styles.bankActions}>
                    {bank.status === 'error' && (
                      <Pressable style={styles.syncButton} onPress={() => {}}>
                        <Text style={styles.syncButtonText}>Retry Sync</Text>
                      </Pressable>
                    )}
                    <Pressable
                      onPress={() => setShowRemoveBank(bank.id)}
                      style={styles.removeButton}
                    >
                      <Trash2 size={20} color="#EF4444" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </Card>
          </View>
        )}

        <View style={styles.section}>
          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Add Another Bank</CardTitle>
              <CardDescription>Connect more accounts for complete financial tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <Pressable style={styles.addBankButton} onPress={() => setShowAddBank(true)}>
                <View style={styles.addBankIcon}>
                  <Plus size={24} color="#10B981" />
                </View>
                <View>
                  <Text style={styles.addBankTitle}>Link a New Bank</Text>
                  <Text style={styles.addBankSubtitle}>Supports 100+ Indian banks</Text>
                </View>
                <ChevronRight size={20} color="#71717A" />
              </Pressable>
            </CardContent>
          </Card>
        </View>

        <View style={styles.section}>
          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>Your financial data stays secure and private</CardDescription>
            </CardHeader>
            <CardContent>
              <View style={styles.featureList}>
                {[
                  { icon: Shield, title: 'Bank-Grade Encryption', desc: 'AES-256 encryption for all data' },
                  { icon: Link, title: 'Read-Only Access', desc: 'We can only view, never move money' },
                  { icon: AlertCircle, title: 'Auto Sync', desc: 'Transactions update automatically' },
                  { icon: Check, title: 'RBI Compliant', desc: 'Licensed account aggregator' },
                ].map((item, i) => (
                  <View key={i} style={styles.featureItem}>
                    <View style={styles.featureIcon}><item.icon size={20} color="#10B981" /></View>
                    <View>
                      <Text style={styles.featureTitle}>{item.title}</Text>
                      <Text style={styles.featureDesc}>{item.desc}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>

      <Modal visible={showAddBank} animationType="slide" transparent={true}>
        <Pressable onPress={() => setShowAddBank(false)} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Link a Bank</Text>
              <Pressable onPress={() => setShowAddBank(false)} style={styles.modalClose}><X size={24} color="#71717A" /></Pressable>
            </View>
            <Text style={styles.modalDesc}>Select your bank to get started</Text>
            <View style={styles.bankList}>
              {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra', 'Yes Bank', 'IDFC First', 'Federal Bank', 'RBL Bank', 'IndusInd Bank'].map((bank, i) => (
                <Pressable key={bank} style={styles.bankListItem} onPress={() => { setShowAddBank(false); }}>
                  <View style={styles.bankListLogo}>{bank.charAt(0)}</View>
                  <Text style={styles.bankListName}>{bank}</Text>
                  <ChevronRight size={20} color="#71717A" />
                </Pressable>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>

      <Modal visible={!!showRemoveBank} animationType="slide" transparent={true}>
        <Pressable onPress={() => setShowRemoveBank(null)} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <AlertTriangle size={48} color="#EF4444" />
              <Text style={styles.modalTitle}>Remove Bank</Text>
              <Text style={styles.modalDesc}>
                This will disconnect {banks.find(b => b.id === showRemoveBank)?.name} and delete all its transaction history. This cannot be undone.
              </Text>
            </View>
            <View style={styles.modalFooter}>
              <Button variant="outline" onPress={() => setShowRemoveBank(null)}>Cancel</Button>
              <Button variant="danger" onPress={() => handleRemoveBank(showRemoveBank!)}>Remove Bank</Button>
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
  section: { gap: 12 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#71717A', textTransform: 'uppercase', letterSpacing: 0.5 },
  card: { marginBottom: 8 },
  bankRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 },
  dividerTop: { borderTopWidth: 1, borderTopColor: '#E4E4E7' },
  bankLogo: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  bankLogoText: { fontSize: 24 },
  bankInfo: { flex: 1, marginLeft: 12, minWidth: 0 },
  bankName: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  bankMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  bankMetaText: { fontSize: 13, color: '#71717A' },
  bankMetaDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#E4E4E7' },
  metaSuccess: { color: '#10B981' },
  metaError: { color: '#EF4444' },
  bankLastSync: { fontSize: 12, color: '#71717A', marginTop: 4 },
  bankActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  syncButton: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#EFF6FF', borderRadius: 8 },
  syncButtonText: { fontSize: 13, fontWeight: '500', color: '#2563EB' },
  removeButton: { padding: 8 },
  addBankButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  addBankIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  addBankTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  addBankSubtitle: { fontSize: 13, color: '#71717A', marginTop: 2 },
  featureList: { gap: 16 },
  featureItem: { flexDirection: 'row', gap: 12 },
  featureIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  featureTitle: { fontSize: 14, fontWeight: '600', color: '#09090B' },
  featureDesc: { fontSize: 13, color: '#71717A', marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#09090B', flex: 1, marginLeft: 12 },
  modalDesc: { fontSize: 14, color: '#71717A', lineHeight: 20, marginTop: 8 },
  modalClose: { padding: 8 },
  bankList: { gap: 8, marginTop: 16, maxHeight: 300 },
  bankListItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 12 },
  bankListLogo: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#10B981', justifyContent: 'center', alignItems: 'center' },
  bankListName: { fontSize: 16, fontWeight: '500', color: '#09090B', flex: 1, marginHorizontal: 12 },
  modalFooter: { flexDirection: 'row', gap: 12, justifyContent: 'flex-end', marginTop: 24 },
});