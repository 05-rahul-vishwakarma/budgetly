import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Shield, Zap, ShieldCheck, BarChart, CreditCard, CheckCircle, Plus } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface ConnectBankCardProps {
  onPress: () => void;
  compact?: boolean;
}

export const ConnectBankCard = ({ onPress, compact = false }: ConnectBankCardProps) => {
  const { colors: c } = useTheme();

  const benefits = compact ? [
    { icon: 'Shield', title: 'Read-Only Access', desc: 'We can only view, never move money' },
    { icon: 'Zap', title: 'Instant Sync', desc: 'Transactions appear in seconds' },
    { icon: 'ShieldCheck', title: 'Bank-Grade Security', desc: 'RBI-licensed Account Aggregator' },
  ] : [
    { icon: 'Shield', title: 'Read-Only Access', desc: 'We can only view, never move money' },
    { icon: 'Zap', title: 'Instant Sync', desc: 'Transactions appear in seconds' },
    { icon: 'ShieldCheck', title: 'Bank-Grade Security', desc: 'RBI-licensed Account Aggregator' },
    { icon: 'BarChart', title: 'Auto-Categorized', desc: 'AI sorts every transaction instantly' },
    { icon: 'CreditCard', title: 'All Banks in One Place', desc: 'HDFC, ICICI, SBI, Axis & 200+ banks' },
    { icon: 'CheckCircle', title: 'Free Forever', desc: 'No hidden charges, no subscription' },
  ];

  const IconComponents = { Shield, Zap, ShieldCheck, BarChart, CreditCard, CheckCircle };

  if (compact) {
    return (
      <Pressable onPress={onPress} style={[styles.compactCard, { backgroundColor: c.card, borderColor: c.border }]} android_ripple={{ color: `${c.teal}20` }}>
        <View style={[styles.compactIcon, { backgroundColor: `${c.teal}15` }]}>
          <Plus size={24} color={c.teal} />
        </View>
        <View style={styles.compactContent}>
          <Text style={[styles.compactTitle, { color: c.text.primary }]}>Connect Bank Account</Text>
          <Text style={[styles.compactDesc, { color: c.text.muted }]}>Link accounts to auto-sync transactions</Text>
        </View>
        <ChevronRight size={20} color={c.text.muted} />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]} android_ripple={{ color: `${c.teal}20` }}>
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: `${c.teal}15` }]}>
          <View style={styles.shieldOuter}>
            <View style={styles.shieldInner}>
              <Shield size={28} color={c.teal} />
            </View>
          </View>
        </View>
        <Text style={[styles.title, { color: c.text.primary }]}>Connect Your Bank</Text>
        <Text style={[styles.subtitle, { color: c.text.muted }]}>Securely link accounts via RBI-licensed Account Aggregators</Text>
      </View>

      <View style={[styles.securityBadge, { backgroundColor: c.background, borderColor: c.border }]}>
        <View style={styles.badgeItem}>
          <ShieldCheck size={16} color={c.teal} />
          <Text style={[styles.badgeText, { color: c.teal }]}>RBI Licensed</Text>
        </View>
        <View style={[styles.badgeDivider, { backgroundColor: c.border }]} />
        <View style={styles.badgeItem}>
          <ShieldCheck size={16} color={c.teal} />
          <Text style={[styles.badgeText, { color: c.teal }]}>Read-Only Access</Text>
        </View>
        <View style={[styles.badgeDivider, { backgroundColor: c.border }]} />
        <View style={styles.badgeItem}>
          <ShieldCheck size={16} color={c.teal} />
          <Text style={[styles.badgeText, { color: c.teal }]}>256-bit Encryption</Text>
        </View>
      </View>

      <View style={styles.benefitsContainer}>
        <Text style={[styles.sectionTitle, { color: c.text.primary }]}>What you get</Text>
        <View style={styles.benefitsGrid}>
          {benefits.map((b, i) => {
            const Icon = IconComponents[b.icon as keyof typeof IconComponents];
            return (
              <View key={i} style={[styles.benefitCard, { backgroundColor: c.background, borderColor: c.border }]}>
                <View style={[styles.benefitIcon, { backgroundColor: `${c.teal}15` }]}>
                  <Icon size={22} color={c.teal} />
                </View>
                <Text style={[styles.benefitTitle, { color: c.text.primary }]}>{b.title}</Text>
                <Text style={[styles.benefitDesc, { color: c.text.muted }]}>{b.desc}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.howItWorks}>
        <Text style={[styles.sectionTitle, { color: c.text.primary }]}>How it works</Text>
        <View style={styles.steps}>
          {[
            { num: '1', title: 'Select Bank', desc: 'Choose from 200+ supported banks' },
            { num: '2', title: 'Authorize', desc: 'Approve via your banking app/OTP' },
            { num: '3', title: 'Auto-Sync', desc: 'Transactions flow in automatically' },
          ].map((s, i) => (
            <View key={i} style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: c.teal }]}>
                <Text style={styles.stepNumberText}>{s.num}</Text>
              </View>
              <View style={styles.stepInfo}>
                <Text style={[styles.stepTitle, { color: c.text.primary }]}>{s.title}</Text>
                <Text style={[styles.stepDesc, { color: c.text.muted }]}>{s.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.trustedBy}>
        <Text style={[styles.trustedTitle, { color: c.text.muted }]}>Trusted by 10M+ users</Text>
        <View style={styles.bankLogos}>
          {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'IDFC'].map((b, i) => (
            <Text key={i} style={[styles.bankLogo, { color: c.text.muted }]}>{b}</Text>
          ))}
        </View>
      </View>

      <View style={[styles.continueButton, { backgroundColor: c.teal }]}>
        <Text style={styles.continueButtonText}>Connect Bank Account</Text>
      </View>
    </Pressable>
  );
};

const { ChevronRight } = require('lucide-react-native');

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderWidth: 1,
    borderRadius: 20,
    gap: 24,
  },
  header: {
    alignItems: 'center',
    gap: 16,
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shieldOuter: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shieldInner: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 14,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeDivider: {
    width: 1,
    height: 24,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  benefitsContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  benefitsGrid: {
    gap: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: 'center',
    gap: 10,
    minWidth: '48%',
  },
  benefitIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitTitle: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  benefitDesc: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
  howItWorks: {
    gap: 16,
  },
  steps: {
    gap: 20,
  },
  step: {
    flexDirection: 'row',
    gap: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  stepInfo: {
    flex: 1,
    gap: 2,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  stepDesc: {
    fontSize: 13,
  },
  trustedBy: {
    gap: 12,
    paddingTop: 8,
  },
  trustedTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  bankLogos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  bankLogo: {
    fontSize: 14,
    fontWeight: '600',
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    marginHorizontal: 24,
    marginTop: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
  },
  compactIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactContent: {
    flex: 1,
    gap: 2,
  },
  compactTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  compactDesc: {
    fontSize: 13,
  },
});