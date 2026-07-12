import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Modal, TextInput, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { ArrowLeft, Building, CreditCard, ChevronRight, Plus, Shield, Link, AlertCircle, Check, Search, X } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/providers/ThemeProvider';

const banks = [
  { id: 'hdfc', name: 'HDFC Bank', logo: '🏦', color: '#001F3F', accounts: 3 },
  { id: 'icici', name: 'ICICI Bank', logo: '🏛️', color: '#FF6B00', accounts: 2 },
  { id: 'sbi', name: 'State Bank of India', logo: '🏦', color: '#0056A3', accounts: 1 },
  { id: 'axis', name: 'Axis Bank', logo: '🏦', color: '#FF0000', accounts: 2 },
  { id: 'kotak', name: 'Kotak Mahindra', logo: '🏦', color: '#00B386', accounts: 1 },
  { id: 'yes', name: 'Yes Bank', logo: '🏦', color: '#003399', accounts: 1 },
  { id: 'idfc', name: 'IDFC First', logo: '🏦', color: '#000000', accounts: 1 },
  { id: 'federal', name: 'Federal Bank', logo: '🏦', color: '#0066CC', accounts: 1 },
  { id: 'indusind', name: 'IndusInd Bank', logo: '🏦', color: '#00A3E0', accounts: 1 },
  { id: 'rbl', name: 'RBL Bank', logo: '🏦', color: '#000000', accounts: 1 },
  { id: 'au', name: 'AU Small Finance', logo: '🏦', color: '#E31E24', accounts: 1 },
  { id: 'bandhan', name: 'Bandhan Bank', logo: '🏦', color: '#0052CC', accounts: 1 },
];

interface BankSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onBankSelect: (bankId: string) => void;
}

export const BankSelectorModal = ({ visible, onClose, onBankSelect }: BankSelectorModalProps) => {
  const router = useRouter();
  const { colors: c } = useTheme();
  const [search, setSearch] = useState('');
  const [modalAnim] = useState(() => new Animated.Value(0));

  const filteredBanks = banks.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    Animated.timing(modalAnim, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible, modalAnim]);

  const handleBack = () => {
    onClose();
  };

  const handleBankPress = (bankId: string) => {
    onBankSelect(bankId);
    onClose();
  };

  const overlayStyle = {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: modalAnim,
  };

  const modalContainerStyle = {
    transform: [
      { translateY: modalAnim.interpolate({ inputRange: [0, 1], outputRange: [300, 0] }) }
    ],
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="none" transparent onRequestClose={handleBack}>
      <Pressable style={overlayStyle} onPress={handleBack} />
      <Animated.View style={[styles.modalContainer, modalContainerStyle]}>
        <SafeAreaView>
          <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <X size={24} color={c.text.secondary} />
          </Pressable>

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={[styles.headerIcon, { backgroundColor: `${c.teal}15` }]}>
                <Building size={32} color={c.teal} />
              </View>
              <Text style={[styles.title, { color: c.text.primary }]}>Connect your bank</Text>
              <Text style={[styles.subtitle, { color: c.text.muted }]}>Select your bank to get started</Text>
            </View>

            <View style={styles.searchContainer}>
              <View style={[styles.searchWrapper, { backgroundColor: c.card, borderColor: c.border }]}>
                <Search size={20} color={c.text.muted} />
                <TextInput
                  style={[styles.searchInput, { color: c.text.primary }]}
                  placeholder="Search your bank..."
                  value={search}
                  onChangeText={setSearch}
                  placeholderTextColor={c.text.muted}
                />
                {search && (
                  <Pressable onPress={() => setSearch('')} style={styles.clearButton}>
                    <X size={18} color={c.text.muted} />
                  </Pressable>
                )}
              </View>
            </View>

            <View style={styles.bankList}>
              {filteredBanks.map((bank) => (
                <Pressable key={bank.id} style={[styles.bankItem, { backgroundColor: c.card, borderColor: c.border }]} onPress={() => handleBankPress(bank.id)}>
                  <View style={[styles.bankLogo, { backgroundColor: bank.color }]}>
                    <Text style={styles.bankLogoText}>{bank.logo}</Text>
                  </View>
                  <View style={styles.bankInfo}>
                    <Text style={[styles.bankName, { color: c.text.primary }]}>{bank.name}</Text>
                    <Text style={[styles.bankMeta, { color: c.text.muted }]}>{bank.accounts} account{bank.accounts > 1 ? 's' : ''}</Text>
                  </View>
                  <ChevronRight size={20} color={c.text.muted} />
                </Pressable>
              ))}
            </View>

            {filteredBanks.length === 0 && search && (
              <View style={[styles.emptyState, { paddingVertical: 40 }]}>
                <Text style={[styles.emptyText, { color: c.text.primary }]}>No banks found</Text>
                <Text style={[styles.emptySubtext, { color: c.text.muted }]}>Try a different search term</Text>
              </View>
            )}

            <View style={styles.section}>
              <Card padding="md" style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
                <View style={styles.cardHeader}>
                  <Text style={[styles.cardTitle, { color: c.text.primary }]}>How it works</Text>
                  <Text style={[styles.cardDesc, { color: c.text.muted }]}>Your financial data stays secure and private</Text>
                </View>
                <View style={styles.featureList}>
                  {[
                    { icon: Shield, title: 'Bank-Grade Encryption', desc: 'AES-256 encryption for all data' },
                    { icon: Link, title: 'Read-Only Access', desc: 'We can only view, never move money' },
                    { icon: AlertCircle, title: 'Auto Sync', desc: 'Transactions update automatically' },
                    { icon: Check, title: 'RBI Compliant', desc: 'Licensed account aggregator' },
                  ].map((item, i) => (
                    <View key={i} style={styles.featureItem}>
                      <View style={[styles.featureIcon, { backgroundColor: `${c.teal}15` }]}>
                        <item.icon size={20} color={c.teal} />
                      </View>
                      <View>
                        <Text style={[styles.featureTitle, { color: c.text.primary }]}>{item.title}</Text>
                        <Text style={[styles.featureDesc, { color: c.text.muted }]}>{item.desc}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </Card>
            </View>

            <View style={styles.addAnother}>
              <Pressable style={[styles.addAnotherButton, { borderColor: c.border }]}>
                <View style={[styles.addAnotherIcon, { backgroundColor: `${c.teal}15` }]}>
                  <Plus size={20} color={c.teal} />
                </View>
                <Text style={[styles.addAnotherText, { color: c.teal }]}>Add another bank</Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: Platform.OS === 'ios' ? 100 : 80,
    maxHeight: '85%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 32, gap: 20 },
  header: { alignItems: 'center', marginBottom: 8, gap: 12 },
  headerIcon: { width: 64, height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', letterSpacing: -0.5 },
  subtitle: { fontSize: 14 },
  searchContainer: { marginTop: 8 },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 14, paddingHorizontal: 16, height: 48, gap: 10 },
  searchInput: { flex: 1, fontSize: 16 },
  clearButton: { padding: 4 },
  bankList: { gap: 12 },
  bankItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderRadius: 14, gap: 12 },
  bankLogo: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  bankLogoText: { fontSize: 24 },
  bankInfo: { flex: 1, gap: 2 },
  bankName: { fontSize: 16, fontWeight: '600' },
  bankMeta: { fontSize: 13 },
  section: { marginTop: 8 },
  card: { padding: 16, borderWidth: 1, borderRadius: 14 },
  cardHeader: { gap: 4, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardDesc: { fontSize: 13 },
  featureList: { gap: 16 },
  featureItem: { flexDirection: 'row', gap: 12 },
  featureIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  featureTitle: { fontSize: 14, fontWeight: '600' },
  featureDesc: { fontSize: 13, marginTop: 2 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 16, fontWeight: '600' },
  emptySubtext: { fontSize: 14, marginTop: 4 },
  addAnother: { marginTop: 8 },
  addAnotherButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderWidth: 2, borderRadius: 14, borderStyle: 'dashed' },
  addAnotherIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  addAnotherText: { fontSize: 14, fontWeight: '500' },
});