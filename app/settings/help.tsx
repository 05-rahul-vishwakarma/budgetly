'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, TextInput, Modal, KeyboardAvoidingView, Platform, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, Search, HelpCircle, MessageSquare, Mail, Phone, Github, ChevronRight, CheckCircle, X, Send, Loader2 } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';

const faqs = [
  { q: 'How do I connect my bank account?', a: 'Go to Settings > Connected Banks > Link a New Bank. Select your bank, authenticate via the account aggregator framework, and grant read-only access. Your transactions will sync automatically.' },
  { q: 'Is my financial data secure?', a: 'Yes. We use AES-256 encryption, bank-grade security standards, and never store your banking credentials. We only receive read-only transaction data through RBI-licensed account aggregators.' },
  { q: 'Can I use the app without connecting a bank?', a: 'Absolutely! You can manually add transactions, create budgets, and track spending. Bank connection is optional for automatic sync.' },
  { q: 'How do budgets and alerts work?', a: 'Create budgets in Settings > Budgets. Set amount, period (weekly/monthly/yearly), and alert threshold (e.g., 80%). You\'ll get push notifications when approaching limits.' },
  { q: 'Can I export my data?', a: 'Yes. Go to Settings > Data & Storage > Export Data. You can download CSV or PDF reports of transactions, budgets, and analytics.' },
  { q: 'What if I forget my password?', a: 'Use "Forgot Password" on the login screen. We\'ll send a reset link to your registered email. For security, we cannot recover or display existing passwords.' },
  { q: 'How do I delete my account?', a: 'Go to Settings > Danger Zone > Delete Account. Type "DELETE" to confirm. This permanently removes all your data within 30 days (financial records retained per RBI for 7 years).' },
  { q: 'Does the app work offline?', a: 'Yes, you can view cached data and add transactions offline. Changes sync when you\'re back online. Bank sync requires internet connection.' },
  { q: 'How do I contact support?', a: 'Use Settings > Contact Us, email support@aifinancialcopilot.com, or use the in-app chat. We typically respond within 24 hours.' },
  { q: 'Are there any fees?', a: 'The app is free to use with all core features. Premium features (advanced analytics, unlimited exports, priority support) may require a subscription in the future.' },
];

export default function HelpCenterScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const handleBack = () => router.back();

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeft size={24} color="#374151" />
      </Pressable>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <HelpCircle size={32} color="#10B981" />
          </View>
          <Text style={styles.title}>Help Center</Text>
          <Text style={styles.subtitle}>Find answers to common questions</Text>
        </View>

        <Card style={styles.searchCard}>
          <CardContent>
            <View style={styles.searchWrapper}>
              <Search size={20} color="#71717A" style={styles.searchIcon} />
              <TextInput
                placeholder="Search help articles..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
                placeholderTextColor="#71717A"
              />
              {searchQuery && (
                <Pressable onPress={() => setSearchQuery('')} style={styles.searchClear}>
                  <X size={18} color="#71717A" />
                </Pressable>
              )}
            </View>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>{filteredFaqs.length} article{filteredFaqs.length !== 1 ? 's' : ''} found</CardDescription>
          </CardHeader>
          <CardContent style={styles.faqList}>
            {filteredFaqs.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <Pressable
                  onPress={() => setExpandedFaq(expandedFaq === faq.q ? null : faq.q)}
                  style={styles.faqQuestion}
                >
                  <Text style={styles.faqQuestionText}>{faq.q}</Text>
                  <ChevronRight
                    size={20}
                    color="#71717A"
                    style={[
                      styles.faqChevron,
                      expandedFaq === faq.q && styles.faqChevronOpen,
                    ]}
                  />
                </Pressable>
                {expandedFaq === faq.q && (
                  <Text style={styles.faqAnswer}>{faq.a}</Text>
                )}
                {index < filteredFaqs.length - 1 && <View style={styles.faqDivider} />}
              </View>
            ))}
            {filteredFaqs.length === 0 && (
              <View style={styles.noResults}>
                <HelpCircle size={48} color="#71717A" style={{ marginBottom: 12 }} />
                <Text style={styles.noResultsTitle}>No results found</Text>
                <Text style={styles.noResultsDesc}>Try different keywords or contact support</Text>
              </View>
            )}
          </CardContent>
        </Card>

        <View style={styles.section}>
          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Still Need Help?</CardTitle>
              <CardDescription>Can\'t find what you\'re looking for?</CardDescription>
            </CardHeader>
            <CardContent>
              <View style={styles.contactOptions}>
                <Pressable style={styles.contactOption}>
                  <View style={styles.contactIcon}><MessageSquare size={24} color="#10B981" /></View>
                  <View>
                    <Text style={styles.contactTitle}>In-App Chat</Text>
                    <Text style={styles.contactDesc}>Chat with our support team</Text>
                  </View>
                  <ChevronRight size={20} color="#71717A" />
                </Pressable>
                <Pressable style={styles.contactOption} onPress={() => Linking.openURL('mailto:support@aifinancialcopilot.com')}>
                  <View style={styles.contactIcon}><Mail size={24} color="#10B981" /></View>
                  <View>
                    <Text style={styles.contactTitle}>Email Support</Text>
                    <Text style={styles.contactDesc}>support@aifinancialcopilot.com</Text>
                  </View>
                  <ChevronRight size={20} color="#71717A" />
                </Pressable>
                <Pressable style={styles.contactOption} onPress={() => Linking.openURL('https://github.com/aifinancialcopilot/help')}>
                  <View style={styles.contactIcon}><Github size={24} color="#10B981" /></View>
                  <View>
                    <Text style={styles.contactTitle}>Documentation</Text>
                    <Text style={styles.contactDesc}>Guides & API reference</Text>
                  </View>
                  <ChevronRight size={20} color="#71717A" />
                </Pressable>
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
  backButton: { position: 'absolute', top: 8, left: 8, zIndex: 10, padding: 8 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32, gap: 16 },
  header: { alignItems: 'center', marginBottom: 8, gap: 12 },
  headerIcon: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#71717A' },
  searchCard: { marginBottom: 8 },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 12, paddingHorizontal: 16 },
  searchIcon: { marginLeft: 4 },
  searchInput: { flex: 1, height: 48, fontSize: 16, color: '#09090B' },
  searchClear: { padding: 4, marginRight: 4 },
  card: { marginBottom: 8 },
  faqList: { gap: 0 },
  faqItem: { paddingVertical: 16, paddingHorizontal: 16 },
  faqQuestion: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  faqQuestionText: { fontSize: 16, fontWeight: '500', color: '#09090B', flex: 1, marginRight: 12 },
  faqChevron: {},
  faqChevronOpen: { transform: [{ rotate: '180deg' }] },
  faqAnswer: { fontSize: 15, color: '#374151', lineHeight: 24, marginTop: 12, paddingRight: 28 },
  faqDivider: { height: 1, backgroundColor: '#E4E4E7', marginHorizontal: 16 },
  noResults: { alignItems: 'center', paddingVertical: 32 },
  noResultsTitle: { fontSize: 18, fontWeight: '600', color: '#09090B' },
  noResultsDesc: { fontSize: 14, color: '#71717A', marginTop: 4 },
  section: { marginTop: 8 },
  contactOptions: { gap: 12 },
  contactOption: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 12, gap: 12 },
  contactIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  contactTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  contactDesc: { fontSize: 13, color: '#71717A', marginTop: 2 },
});