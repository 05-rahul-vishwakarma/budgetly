'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Modal, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, Download, Upload, Trash2, Database, HardDrive, FileText, ChevronRight, AlertCircle, CheckCircle, X, Share2, ExternalLink, Tag, Target } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Badge } from '@/shared/components/ui/Badge';

export default function DataStorageScreen() {
  const router = useRouter();
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'json'>('csv');
  const [exportRange, setExportRange] = useState<'all' | 'year' | 'month'>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteData, setShowDeleteData] = useState(false);
  const [deleteDataType, setDeleteDataType] = useState<'transactions' | 'budgets' | 'categories' | 'all'>('transactions');

  const handleBack = () => router.back();

  const handleExport = async () => {
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsExporting(false);
    setShowExportModal(false);
    Alert.alert('Export Ready', `Your ${exportFormat.toUpperCase()} export is ready. Check your Files app.`);
  };

  const handleDeleteData = () => {
    Alert.alert(
      `Delete ${deleteDataType.charAt(0).toUpperCase() + deleteDataType.slice(1)}`,
      `This will permanently delete all ${deleteDataType}. This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => { setShowDeleteData(false); Alert.alert('Deleted', `${deleteDataType} data has been deleted.`); } },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeft size={24} color="#374151" />
      </Pressable>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Database size={32} color="#10B981" />
          </View>
          <Text style={styles.title}>Data & Storage</Text>
          <Text style={styles.subtitle}>Manage your data and exports</Text>
        </View>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
            <CardDescription>How much space your data uses</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.storageBar}>
              <View style={[styles.storageFill, { width: '35%' }]} />
            </View>
            <View style={styles.storageStats}>
              <View style={styles.storageStat}>
                <Text style={styles.storageStatValue}>2.4 MB</Text>
                <Text style={styles.storageStatLabel}>Used</Text>
              </View>
              <View style={styles.storageStat}>
                <Text style={styles.storageStatValue}>12.6 MB</Text>
                <Text style={styles.storageStatLabel}>Available</Text>
              </View>
              <View style={styles.storageStat}>
                <Text style={styles.storageStatValue}>15 MB</Text>
                <Text style={styles.storageStatLabel}>Total</Text>
              </View>
            </View>
            <View style={styles.storageBreakdown}>
              {[
                { label: 'Transactions', size: '1.2 MB', icon: FileText, color: '#3B82F6' },
                { label: 'Budgets', size: '240 KB', icon: Target, color: '#10B981' },
                { label: 'Categories', size: '180 KB', icon: Tag, color: '#8B5CF6' },
                { label: 'Settings & Cache', size: '800 KB', icon: HardDrive, color: '#F59E0B' },
              ].map((item, i) => (
                <View key={i} style={styles.storageItem}>
                  <View style={[styles.storageItemIcon, { backgroundColor: `${item.color}20` }]}><item.icon size={16} color={item.color} /></View>
                  <Text style={styles.storageItemLabel}>{item.label}</Text>
                  <Text style={styles.storageItemSize}>{item.size}</Text>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Export Data</CardTitle>
            <CardDescription>Download your financial data</CardDescription>
          </CardHeader>
          <CardContent>
            <Pressable style={styles.exportButton} onPress={() => setShowExportModal(true)}>
              <View style={styles.exportButtonIcon}>
                <Download size={24} color="#10B981" />
              </View>
              <View style={styles.exportButtonText}>
                <Text style={styles.exportButtonTitle}>Export Data</Text>
                <Text style={styles.exportButtonDesc}>CSV, PDF, or JSON format</Text>
              </View>
              <ChevronRight size={20} color="#71717A" />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.exportButton} onPress={() => Alert.alert('Coming Soon', 'Scheduled exports will be available in a future update.')}>
              <View style={styles.exportButtonIcon}>
                <Share2 size={24} color="#10B981" />
              </View>
              <View style={styles.exportButtonText}>
                <Text style={styles.exportButtonTitle}>Scheduled Exports</Text>
                <Text style={styles.exportButtonDesc}>Auto-export weekly/monthly (Coming Soon)</Text>
              </View>
              <ChevronRight size={20} color="#71717A" />
            </Pressable>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Import Data</CardTitle>
            <CardDescription>Restore from backup or migrate from other apps</CardDescription>
          </CardHeader>
          <CardContent>
            <Pressable style={styles.exportButton} onPress={() => Alert.alert('Coming Soon', 'Import from CSV/JSON will be available soon.')}>
              <View style={styles.exportButtonIcon}>
                <Upload size={24} color="#10B981" />
              </View>
              <View style={styles.exportButtonText}>
                <Text style={styles.exportButtonTitle}>Import Transactions</Text>
                <Text style={styles.exportButtonDesc}>CSV or JSON files</Text>
              </View>
              <ChevronRight size={20} color="#71717A" />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.exportButton} onPress={() => Alert.alert('Coming Soon', 'Migration tools coming soon.')}>
              <View style={styles.exportButtonIcon}>
                <ExternalLink size={24} color="#10B981" />
              </View>
              <View style={styles.exportButtonText}>
                <Text style={styles.exportButtonTitle}>Migrate from Other Apps</Text>
                <Text style={styles.exportButtonDesc}>YNAB, Mint, Excel, etc.</Text>
              </View>
              <ChevronRight size={20} color="#71717A" />
            </Pressable>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Control what data is stored</CardDescription>
          </CardHeader>
          <CardContent>
            <Pressable style={styles.dataAction} onPress={() => { setDeleteDataType('transactions'); setShowDeleteData(true); }}>
              <View style={styles.dataActionIcon}><FileText size={20} color="#EF4444" /></View>
              <View>
                <Text style={styles.dataActionTitle}>Clear Transactions</Text>
                <Text style={styles.dataActionDesc}>Remove all transaction history</Text>
              </View>
              <ChevronRight size={20} color="#71717A" />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.dataAction} onPress={() => { setDeleteDataType('budgets'); setShowDeleteData(true); }}>
              <View style={styles.dataActionIcon}><Target size={20} color="#EF4444" /></View>
              <View>
                <Text style={styles.dataActionTitle}>Clear Budgets</Text>
                <Text style={styles.dataActionDesc}>Remove all budget configurations</Text>
              </View>
              <ChevronRight size={20} color="#71717A" />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.dataAction} onPress={() => { setDeleteDataType('categories'); setShowDeleteData(true); }}>
              <View style={styles.dataActionIcon}><Tag size={20} color="#EF4444" /></View>
              <View>
                <Text style={styles.dataActionTitle}>Clear Custom Categories</Text>
                <Text style={styles.dataActionDesc}>Reset to default categories</Text>
              </View>
              <ChevronRight size={20} color="#71717A" />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={[styles.dataAction, styles.dataActionDanger]} onPress={() => { setDeleteDataType('all'); setShowDeleteData(true); }}>
              <View style={styles.dataActionIcon}><Trash2 size={20} color="#EF4444" /></View>
              <View>
                <Text style={styles.dataActionTitle}>Reset All Data</Text>
                <Text style={styles.dataActionDesc}>Start fresh (keeps account)</Text>
              </View>
              <ChevronRight size={20} color="#EF4444" />
            </Pressable>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Backup & Sync</CardTitle>
            <CardDescription>Keep your data safe across devices</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.backupRow}>
              <View style={styles.backupItem}>
                <View style={styles.backupIcon}><CheckCircle size={24} color="#10B981" /></View>
                <View>
                  <Text style={styles.backupTitle}>iCloud Backup</Text>
                  <Text style={styles.backupDesc}>Enabled • Last sync: 2 hours ago</Text>
                </View>
              </View>
              <Switch value={true} onValueChange={() => {}} trackColor={{ false: '#E4E4E7', true: '#10B981' }} />
            </View>
            <View style={styles.divider} />
            <View style={styles.backupRow}>
              <View style={styles.backupItem}>
                <View style={styles.backupIcon}><Database size={24} color="#10B981" /></View>
                <View>
                  <Text style={styles.backupTitle}>Local Encrypted Backup</Text>
                  <Text style={styles.backupDesc}>AES-256 encrypted on device</Text>
                </View>
              </View>
              <Switch value={true} onValueChange={() => {}} trackColor={{ false: '#E4E4E7', true: '#10B981' }} />
            </View>
            <View style={styles.divider} />
            <View style={styles.backupRow}>
              <View style={styles.backupItem}>
                <View style={styles.backupIcon}><AlertCircle size={24} color="#F59E0B" /></View>
                <View>
                  <Text style={styles.backupTitle}>Cross-Device Sync</Text>
                  <Text style={styles.backupDesc}>Not available (Coming Soon)</Text>
                </View>
              </View>
              <Switch value={false} onValueChange={() => {}} trackColor={{ false: '#E4E4E7', true: '#10B981' }} disabled />
            </View>
          </CardContent>
        </Card>
      </ScrollView>

      <Modal visible={showExportModal} animationType="slide" transparent={true}>
        <Pressable onPress={() => setShowExportModal(false)} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Export Data</Text>
              <Pressable onPress={() => setShowExportModal(false)} style={styles.modalClose}><X size={24} color="#71717A" /></Pressable>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalSectionTitle}>Format</Text>
              <View style={styles.formatOptions}>
                {['csv', 'pdf', 'json'].map((f) => (
                  <Pressable key={f} onPress={() => setExportFormat(f as any)} style={[styles.formatOption, exportFormat === f && styles.formatOptionSelected]}>
                    <Text style={[styles.formatOptionLabel, exportFormat === f && styles.formatOptionLabelSelected]}>{f.toUpperCase()}</Text>
                    <Text style={styles.formatOptionDesc}>{f === 'csv' ? 'Spreadsheet compatible' : f === 'pdf' ? 'Printable report' : 'Developer format'}</Text>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.modalSectionTitle}>Date Range</Text>
              <View style={styles.formatOptions}>
                {['all', 'year', 'month'].map((r) => (
                  <Pressable key={r} onPress={() => setExportRange(r as any)} style={[styles.formatOption, exportRange === r && styles.formatOptionSelected]}>
                    <Text style={[styles.formatOptionLabel, exportRange === r && styles.formatOptionLabelSelected]}>{r === 'all' ? 'All Time' : r === 'year' ? 'This Year' : 'This Month'}</Text>
                    <Text style={styles.formatOptionDesc}>{r === 'all' ? 'Complete history' : r === 'year' ? 'Jan - Dec 2025' : 'Current month'}</Text>
                  </Pressable>
                ))}
              </View>
              <View style={styles.exportOptions}>
                <View style={styles.exportOption}>
                  <Text style={styles.exportOptionTitle}>Include Attachments</Text>
                  <Switch value={false} onValueChange={() => {}} trackColor={{ false: '#E4E4E7', true: '#10B981' }} />
                </View>
                <View style={styles.exportOption}>
                  <Text style={styles.exportOptionTitle}>Anonymize Data</Text>
                  <Switch value={false} onValueChange={() => {}} trackColor={{ false: '#E4E4E7', true: '#10B981' }} />
                </View>
              </View>
            </View>
            <View style={styles.modalFooter}>
              <Button variant="outline" onPress={() => setShowExportModal(false)}>Cancel</Button>
              <Button onPress={handleExport} loading={isExporting}>{isExporting ? 'Exporting...' : 'Export Data'}</Button>
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
  header: { alignItems: 'center', marginBottom: 8, gap: 12 },
  headerIcon: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#71717A' },
  card: { marginBottom: 8 },
  storageBar: { height: 8, backgroundColor: '#E4E4E7', borderRadius: 4, marginBottom: 16, overflow: 'hidden' },
  storageFill: { height: '100%', backgroundColor: '#10B981', borderRadius: 4 },
  storageStats: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  storageStat: { alignItems: 'center' },
  storageStatValue: { fontSize: 18, fontWeight: '700', color: '#09090B' },
  storageStatLabel: { fontSize: 12, color: '#71717A', marginTop: 2 },
  storageBreakdown: { gap: 12 },
  storageItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  storageItemIcon: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  storageItemLabel: { fontSize: 14, color: '#374151', flex: 1 },
  storageItemSize: { fontSize: 14, fontWeight: '500', color: '#09090B' },
  divider: { height: 1, backgroundColor: '#E4E4E7', marginHorizontal: -16, marginVertical: 8 },
  exportButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12 },
  exportButtonIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  exportButtonText: { flex: 1 },
  exportButtonTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  exportButtonDesc: { fontSize: 13, color: '#71717A', marginTop: 2 },
  dataAction: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12 },
  dataActionIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#FEF2F2', justifyContent: 'center', alignItems: 'center' },
  dataActionTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  dataActionDesc: { fontSize: 13, color: '#71717A', marginTop: 2 },
  dataActionDanger: { backgroundColor: '#FEF2F2' },
  backupRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  backupItem: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  backupIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  backupTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  backupDesc: { fontSize: 13, color: '#71717A', marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#09090B' },
  modalClose: { padding: 8 },
  modalBody: { gap: 20, marginBottom: 24 },
  modalSectionTitle: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 12 },
  formatOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  formatOption: { padding: 16, backgroundColor: '#F8FAFC', borderWidth: 2, borderColor: '#E4E4E7', borderRadius: 12, minWidth: 100 },
  formatOptionSelected: { borderColor: '#10B981', backgroundColor: '#ECFDF5' },
  formatOptionLabel: { fontSize: 14, fontWeight: '600', color: '#09090B', marginBottom: 4 },
  formatOptionLabelSelected: { color: '#10B981' },
  formatOptionDesc: { fontSize: 12, color: '#71717A' },
  exportOptions: { gap: 12 },
  exportOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  exportOptionTitle: { fontSize: 15, color: '#374151' },
  modalFooter: { flexDirection: 'row', gap: 12, justifyContent: 'flex-end' },
});