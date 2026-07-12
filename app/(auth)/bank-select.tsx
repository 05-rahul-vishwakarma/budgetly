'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, Building, CreditCard, ChevronRight, Plus, Shield, Link, AlertCircle, Check, Search } from 'lucide-react-native';

const banks = [
  { id: '1', name: 'HDFC Bank', logo: '🏦', color: '#001F3F', accounts: 3 },
  { id: '2', name: 'ICICI Bank', logo: '🏛️', color: '#FF6B00', accounts: 2 },
  { id: '3', name: 'SBI', logo: '🏦', color: '#0056A3', accounts: 1 },
  { id: '4', name: 'Axis Bank', logo: '🏦', color: '#FF0000', accounts: 2 },
  { id: '5', name: 'Kotak Mahindra', logo: '🏦', color: '#00B386', accounts: 1 },
  { id: '6', name: 'Yes Bank', logo: '🏦', color: '#003399', accounts: 1 },
  { id: '7', name: 'IDFC First', logo: '🏦', color: '#000000', accounts: 1 },
  { id: '8', name: 'Federal Bank', logo: '🏦', color: '#0066CC', accounts: 1 },
  { id: '9', name: 'IndusInd Bank', logo: '🏦', color: '#00A3E0', accounts: 1 },
  { id: '10', name: 'RBL Bank', logo: '🏦', color: '#000000', accounts: 1 },
  { id: '11', name: 'AU Small Finance', logo: '🏦', color: '#E31E24', accounts: 1 },
  { id: '12', name: 'Bandhan Bank', logo: '🏦', color: '#0052CC', accounts: 1 },
];

export default function BankSelectScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleBack = () => router.back();

  const filteredBanks = banks.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  const handleBankPress = (bankId: string) => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Building size={32} color="#10B981" />
          </View>
          <Text style={styles.title}>Connect your bank</Text>
          <Text style={styles.subtitle}>Select your bank to get started</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <Search size={20} color="#71717A" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search your bank..."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#A1A1AA"
            />
          </View>
        </View>

        <View style={styles.bankList}>
          {filteredBanks.map((bank) => (
            <Pressable key={bank.id} style={styles.bankItem} onPress={() => handleBankPress(bank.id)}>
              <View style={[styles.bankLogo, { backgroundColor: bank.color }]}>
                <Text style={styles.bankLogoText}>{bank.logo}</Text>
              </View>
              <View style={styles.bankInfo}>
                <Text style={styles.bankName}>{bank.name}</Text>
                <Text style={styles.bankMeta}>{bank.accounts} account{bank.accounts > 1 ? 's' : ''}</Text>
              </View>
              <ChevronRight size={20} color="#71717A" />
            </Pressable>
          ))}
        </View>

        {filteredBanks.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No banks found</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>How it works</Text>
              <Text style={styles.cardDesc}>Your financial data stays secure and private</Text>
            </View>
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
          </View>
        </View>

        <View style={styles.addAnother}>
          <Pressable style={styles.addAnotherButton}>
            <View style={styles.addAnotherIcon}><Plus size={20} color="#10B981" /></View>
            <Text style={styles.addAnotherText}>Add another bank</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  backButton: { position: 'absolute', top: 8, left: 8, zIndex: 10, padding: 8 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32, gap: 20 },
  header: { alignItems: 'center', marginBottom: 8, gap: 12 },
  headerIcon: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#71717A' },
  searchContainer: { marginTop: 8 },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 14, paddingHorizontal: 16, height: 48, gap: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#09090B' },
  bankList: { gap: 12 },
  bankItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 14, gap: 12 },
  bankLogo: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  bankLogoText: { fontSize: 24 },
  bankInfo: { flex: 1, gap: 2 },
  bankName: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  bankMeta: { fontSize: 13, color: '#71717A' },
  section: { marginTop: 8 },
  card: { padding: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 14 },
  cardHeader: { gap: 4, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  cardDesc: { fontSize: 13, color: '#71717A' },
  featureList: { gap: 16 },
  featureItem: { flexDirection: 'row', gap: 12 },
  featureIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  featureTitle: { fontSize: 14, fontWeight: '600', color: '#09090B' },
  featureDesc: { fontSize: 13, color: '#71717A', marginTop: 2 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  emptySubtext: { fontSize: 14, color: '#71717A', marginTop: 4 },
  addAnother: { marginTop: 8 },
  addAnotherButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderWidth: 2, borderColor: '#E4E4E7', borderRadius: 14, borderStyle: 'dashed' },
  addAnotherIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  addAnotherText: { fontSize: 14, fontWeight: '500', color: '#10B981' },
});