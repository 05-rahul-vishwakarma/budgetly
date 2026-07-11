'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Linking, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Shield, FileText, AlertCircle, CheckCircle, ExternalLink, ChevronRight, Mail, Phone, MessageSquare, Github, Twitter, Linkedin } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  const handleBack = () => router.back();

  const sections = [
    { id: 'overview', title: 'Overview', content: 'AI Financial Copilot ("we", "our", "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.' },
    { id: 'data-collection', title: 'Information We Collect', items: [
      'Personal Information: Name, email, phone number, profile picture',
      'Financial Data: Transactions, account balances, budgets, spending patterns',
      'Device Information: Device ID, OS version, app version, IP address',
      'Usage Data: App interactions, features used, session duration',
      'Location Data: Approximate location for fraud prevention (with consent)',
    ]},
    { id: 'data-usage', title: 'How We Use Your Information', items: [
      'Provide and improve our financial tracking services',
      'Sync transactions from connected bank accounts',
      'Generate personalized insights and budgets',
      'Send security alerts and important notifications',
      'Comply with legal obligations and prevent fraud',
      'Communicate updates, offers, and support responses',
    ]},
    { id: 'data-sharing', title: 'Data Sharing & Disclosure', items: [
      'Bank Partners: Only to fetch transactions (read-only, encrypted)',
      'Service Providers: Cloud hosting, analytics, push notifications (under strict contracts)',
      'Legal Requirements: When required by law or to protect rights',
      'Business Transfers: In case of merger/acquisition (with notice)',
      'We NEVER sell your personal or financial data to third parties',
    ]},
    { id: 'security', title: 'Data Security', items: [
      'AES-256 encryption for data at rest and in transit',
      'Bank-grade security standards (PCI DSS, ISO 27001)',
      'Regular security audits and penetration testing',
      'Biometric authentication support (Face ID / Touch ID)',
      'Automatic session timeout and remote logout',
    ]},
    { id: 'retention', title: 'Data Retention', content: 'We retain your data while your account is active. After account deletion, data is purged within 30 days, except where legally required (financial records: 7 years per RBI guidelines).' },
    { id: 'rights', title: 'Your Rights', items: [
      'Access: Request a copy of your data',
      'Correction: Update inaccurate information',
      'Deletion: Request account and data deletion',
      'Portability: Export your data in standard format',
      'Restriction: Limit processing of your data',
      'Objection: Opt-out of marketing communications',
    ]},
    { id: 'contact', title: 'Contact Us', content: 'For privacy concerns or to exercise your rights, contact us at privacy@aifinancialcopilot.com or through the app\'s Contact Us section.' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeft size={24} color="#374151" />
      </Pressable>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Shield size={32} color="#10B981" />
          </View>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.subtitle}>Last updated: January 2025</Text>
        </View>

        {sections.map((section) => (
          <Card key={section.id} style={styles.card}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {section.content && <Text style={styles.bodyText}>{section.content}</Text>}
              {section.items && (
                <View style={styles.list}>
                  {section.items.map((item, i) => (
                    <View key={i} style={styles.listItem}>
                      <CheckCircle size={20} color="#10B981" />
                      <Text style={styles.listItemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              )}
            </CardContent>
          </Card>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>By using AI Financial Copilot, you agree to this Privacy Policy.</Text>
          <Pressable style={styles.footerLink} onPress={() => Linking.openURL('mailto:privacy@aifinancialcopilot.com')}>
            <Text style={styles.footerLinkText}>Contact Privacy Team →</Text>
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
  scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32, gap: 16 },
  header: { alignItems: 'center', marginBottom: 8, gap: 12 },
  headerIcon: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#71717A' },
  card: { marginBottom: 8 },
  bodyText: { fontSize: 15, color: '#374151', lineHeight: 24 },
  list: { gap: 12, marginTop: 4 },
  listItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  listItemText: { fontSize: 15, color: '#374151', lineHeight: 24, flex: 1 },
  footer: { alignItems: 'center', paddingTop: 16, paddingBottom: 24, gap: 8, borderTopWidth: 1, borderTopColor: '#E4E4E7' },
  footerText: { fontSize: 13, color: '#71717A', textAlign: 'center' },
  footerLink: { paddingVertical: 4 },
  footerLinkText: { fontSize: 13, fontWeight: '600', color: '#10B981' },
});