'use client';

import { View, Text, Pressable, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Shield, Zap, ShieldCheck, BarChart, CreditCard, CheckCircle } from 'lucide-react-native';

export default function BankIntroScreen() {
  const router = useRouter();

  const handleBack = () => router.back();
  const handleContinue = () => router.push('/(auth)/bank-select');

  const benefits = [
    { icon: 'Shield', title: 'Read-Only Access', desc: 'We can only view, never move money' },
    { icon: 'Zap', title: 'Instant Sync', desc: 'Transactions appear in seconds' },
    { icon: 'ShieldCheck', title: 'Bank-Grade Security', desc: 'RBI-licensed Account Aggregator network' },
    { icon: 'BarChart', title: 'Auto-Categorized', desc: 'AI sorts every transaction instantly' },
    { icon: 'CreditCard', title: 'All Banks in One Place', desc: 'HDFC, ICICI, SBI, Axis & 200+ banks' },
    { icon: 'CheckCircle', title: 'Free Forever', desc: 'No hidden charges, no subscription' },
  ];

  const IconComponents = { Shield, Zap, ShieldCheck, BarChart, CreditCard, CheckCircle };

  return (
    <SafeAreaView style={styles.container}>
      

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <View style={styles.shieldOuter}>
              <View style={styles.shieldInner}>
                <Shield size={28} color="#10B981" />
              </View>
            </View>
          </View>
          <Text style={styles.title}>Connect Your Bank</Text>
          <Text style={styles.subtitle}>Securely link accounts via RBI-licensed Account Aggregators</Text>
        </View>

        <View style={styles.securityBadge}>
          <View style={styles.badgeItem}>
            <ShieldCheck size={16} color="#10B981" />
            <Text style={styles.badgeText}>RBI Licensed</Text>
          </View>
          <View style={styles.badgeDivider} />
          <View style={styles.badgeItem}>
            <ShieldCheck size={16} color="#10B981" />
            <Text style={styles.badgeText}>Read-Only Access</Text>
          </View>
          <View style={styles.badgeDivider} />
          <View style={styles.badgeItem}>
            <ShieldCheck size={16} color="#10B981" />
            <Text style={styles.badgeText}>256-bit Encryption</Text>
          </View>
        </View>

        <View style={styles.benefitsContainer}>
          <Text style={styles.sectionTitle}>What you get</Text>
          <View style={styles.benefitsGrid}>
            {benefits.map((b, i) => {
              const Icon = IconComponents[b.icon as keyof typeof IconComponents];
              return (
                <View key={i} style={styles.benefitCard}>
                  <View style={styles.benefitIcon}>
                    <Icon size={22} color="#10B981" />
                  </View>
                  <Text style={styles.benefitTitle}>{b.title}</Text>
                  <Text style={styles.benefitDesc}>{b.desc}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.howItWorks}>
          <Text style={styles.sectionTitle}>How it works</Text>
          <View style={styles.steps}>
            {[
              { num: '1', title: 'Select Bank', desc: 'Choose from 200+ supported banks' },
              { num: '2', title: 'Authorize', desc: 'Approve via your banking app/OTP' },
              { num: '3', title: 'Auto-Sync', desc: 'Transactions flow in automatically' },
            ].map((s, i) => (
              <View key={i} style={styles.step}>
                <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{s.num}</Text></View>
                <View style={styles.stepInfo}>
                  <Text style={styles.stepTitle}>{s.title}</Text>
                  <Text style={styles.stepDesc}>{s.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.trustedBy}>
          <Text style={styles.trustedTitle}>Trusted by 10M+ users</Text>
          <View style={styles.bankLogos}>
            {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'IDFC'].map((b, i) => (
              <Text key={i} style={styles.bankLogo}>{b}</Text>
            ))}
          </View>
        </View>
      </ScrollView>

      <Pressable onPress={handleContinue} style={styles.continueButton} android_ripple={{ color: 'rgba(255,255,255,0.2)' }}>
        <Text style={styles.continueButtonText}>Connect Bank Account</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  backButton: { position: 'absolute', top: 8, left: 8, zIndex: 10, padding: 8 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 100, gap: 32 },
  header: { alignItems: 'center', marginBottom: 8, gap: 16 },
  headerIcon: { width: 80, height: 80, borderRadius: 20, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  shieldOuter: { width: 56, height: 56, borderRadius: 14, backgroundColor: '#10B981', justifyContent: 'center', alignItems: 'center' },
  shieldInner: { width: 44, height: 44, borderRadius: 10, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#71717A', textAlign: 'center', lineHeight: 24, paddingHorizontal: 20 },
  securityBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, paddingVertical: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 14 },
  badgeItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  badgeDivider: { width: 1, height: 24, backgroundColor: '#E4E4E7' },
  badgeText: { fontSize: 12, fontWeight: '500', color: '#10B981' },
  benefitsContainer: { gap: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#09090B' },
  benefitsGrid: { gap: 12 },
  benefitCard: { flex: 1, padding: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 14, alignItems: 'center', gap: 10, minWidth: '48%' },
  benefitIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  benefitTitle: { fontSize: 13, fontWeight: '600', color: '#09090B', textAlign: 'center' },
  benefitDesc: { fontSize: 11, color: '#71717A', textAlign: 'center', lineHeight: 16 },
  howItWorks: { gap: 16 },
  steps: { gap: 20 },
  step: { flexDirection: 'row', gap: 16 },
  stepNumber: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#10B981', justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  stepNumberText: { fontSize: 14, fontWeight: '600', color: '#fff' },
  stepInfo: { flex: 1, gap: 2 },
  stepTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  stepDesc: { fontSize: 13, color: '#71717A' },
  trustedBy: { gap: 12, paddingTop: 8 },
  trustedTitle: { fontSize: 14, fontWeight: '500', color: '#71717A', textAlign: 'center' },
  bankLogos: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 16 },
  bankLogo: { fontSize: 14, fontWeight: '600', color: '#71717A' },
  continueButton: { paddingVertical: 16, borderRadius: 16, backgroundColor: '#10B981', alignItems: 'center', shadowColor: '#10B981', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8, marginHorizontal: 24, marginBottom: 32 },
  continueButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});