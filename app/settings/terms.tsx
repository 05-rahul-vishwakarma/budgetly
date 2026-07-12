'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, FileText, Shield, AlertCircle, CheckCircle, ExternalLink, ChevronRight, Gavel, Scale } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function TermsOfServiceScreen() {
  const router = useRouter();

  const handleBack = () => router.back();

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms', content: 'By downloading, installing, or using AI Financial Copilot ("the App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use the App.' },
    { id: 'license', title: 'License Grant', items: [
      'We grant you a limited, non-exclusive, non-transferable license to use the App',
      'You may not copy, modify, distribute, or reverse engineer the App',
      'All rights not expressly granted are reserved by AI Financial Copilot',
    ]},
    { id: 'account', title: 'Account & Registration', items: [
      'You must provide accurate, complete registration information',
      'You are responsible for maintaining account confidentiality',
      'You must notify us immediately of any unauthorized use',
      'One person may not maintain multiple accounts',
    ]},
    { id: 'financial', title: 'Financial Data & Services', content: 'The App provides financial tracking and insights. We are not a bank, financial advisor, or licensed financial institution. All information is for educational purposes only and does not constitute financial advice. Consult a qualified professional for financial decisions.' },
    { id: 'bank-connections', title: 'Bank Connections', items: [
      'Connections use licensed account aggregators (RBI regulated)',
      'We receive read-only access to transaction data',
      'We cannot initiate transactions or move funds',
      'You authorize us to fetch data on your behalf',
      'You may revoke access at any time in Settings',
    ]},
    { id: 'user-content', title: 'User Content', items: [
      'You retain ownership of data you input',
      'You grant us license to process data to provide services',
      'You represent you have rights to all submitted data',
      'We may remove content violating these Terms',
    ]},
    { id: 'prohibited', title: 'Prohibited Activities', items: [
      'Reverse engineering, decompiling, or disassembling the App',
      'Using the App for illegal or unauthorized purposes',
      'Interfering with security features or other users',
      'Automated scraping or data extraction',
      'Sharing account credentials with third parties',
    ]},
    { id: 'disclaimers', title: 'Disclaimers', items: [
      'App provided "as is" without warranties of any kind',
      'No guarantee of uninterrupted or error-free service',
      'Financial data may have delays or inaccuracies',
      'Third-party services (banks, APIs) may change without notice',
    ]},
    { id: 'limitation', title: 'Limitation of Liability', content: 'To the maximum extent permitted by law, AI Financial Copilot shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.' },
    { id: 'termination', title: 'Termination', items: [
      'We may suspend or terminate access for Terms violations',
      'You may delete your account at any time in Settings',
      'Certain provisions survive termination (liability, IP, disputes)',
    ]},
    { id: 'governing', title: 'Governing Law', content: 'These Terms are governed by the laws of India. Disputes shall be resolved in the courts of Mumbai, Maharashtra.' },
    { id: 'changes', title: 'Changes to Terms', content: 'We may update these Terms. Material changes will be notified via the App or email. Continued use after changes constitutes acceptance.' },
    { id: 'contact', title: 'Contact', content: 'Questions about these Terms? Contact us at legal@aifinancialcopilot.com or through the app\'s Contact Us section.' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Gavel size={32} color="#10B981" />
          </View>
          <Text style={styles.title}>Terms of Service</Text>
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
          <Text style={styles.footerText}>By using AI Financial Copilot, you agree to these Terms.</Text>
          <Pressable style={styles.footerLink} onPress={() => Linking.openURL('mailto:legal@aifinancialcopilot.com')}>
            <Text style={styles.footerLinkText}>Contact Legal Team →</Text>
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