'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Modal, TextInput, KeyboardAvoidingView, Platform, Switch, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, Phone, MessageSquare, MapPin, Clock, Globe, Send, Twitter, Github, Linkedin, HelpCircle, Shield, FileText, Gavel, ChevronRight, Database, Trash2, User, Bell, Palette, CreditCard, Tag, Target } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

export default function SettingsScreen() {
  const router = useRouter();
  const handleBack = () => router.back();

  const settingsSections: Array<{
    title: string;
    items: Array<{
      id: string;
      title: string;
      subtitle: string;
      icon: any;
      destructive?: boolean;
    }>;
  }> = [
    {
      title: 'Account',
      items: [
        { id: 'profile', title: 'Profile', subtitle: 'Manage your personal information', icon: User },
        { id: 'security', title: 'Security', subtitle: 'Password, biometrics & 2FA', icon: Shield },
        { id: 'notifications', title: 'Notifications', subtitle: 'Manage notification preferences', icon: Bell },
        { id: 'appearance', title: 'Appearance', subtitle: 'Theme, colors & display', icon: Palette },
      ],
    },
    {
      title: 'Features',
      items: [
        { id: 'banks', title: 'Connected Banks', subtitle: 'Manage bank connections', icon: CreditCard },
        { id: 'categories', title: 'Categories', subtitle: 'Customize spending categories', icon: Tag },
        { id: 'budgets', title: 'Budgets', subtitle: 'Budget settings & alerts', icon: Target },
      ],
    },
    {
      title: 'Privacy & Legal',
      items: [
        { id: 'privacy', title: 'Privacy Policy', subtitle: 'How we protect your data', icon: Shield },
        { id: 'terms', title: 'Terms of Service', subtitle: 'Usage terms & conditions', icon: FileText },
        { id: 'data', title: 'Data & Storage', subtitle: 'Manage your data & export', icon: Database },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 'help', title: 'Help Center', subtitle: 'FAQs & guides', icon: HelpCircle },
        { id: 'contact', title: 'Contact Us', subtitle: 'Get in touch with support', icon: MessageSquare },
        { id: 'feedback', title: 'Send Feedback', subtitle: 'Help us improve', icon: Send },
      ],
    },
    {
      title: 'Danger Zone',
      items: [
        { id: 'delete', title: 'Delete Account', subtitle: 'Permanently delete your account', icon: Trash2, destructive: true },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeft size={24} color="#374151" />
      </Pressable>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Manage your preferences</Text>
          </View>
        </View>

        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Card padding="none" variant="outlined" style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <Pressable
                  key={item.id}
                  onPress={() => {
                    if (item.id === 'delete') {
                      router.push('/settings/delete-account' as any);
                    } else if (item.id === 'profile') {
                      router.push('/profile' as any);
                    } else if (item.id === 'appearance') {
                      router.push('/settings/appearance' as any);
                    } else if (item.id === 'notifications') {
                      router.push('/settings/notifications' as any);
                    } else if (item.id === 'security') {
                      router.push('/settings/security' as any);
                    } else if (item.id === 'banks') {
                      router.push('/settings/banks' as any);
                    } else if (item.id === 'categories') {
                      router.push('/settings/categories' as any);
                    } else if (item.id === 'budgets') {
                      router.push('/settings/budgets' as any);
                    } else if (item.id === 'privacy') {
                      router.push('/settings/privacy' as any);
                    } else if (item.id === 'terms') {
                      router.push('/settings/terms' as any);
                    } else if (item.id === 'data') {
                      router.push('/settings/data' as any);
                    } else if (item.id === 'help') {
                      router.push('/settings/help' as any);
                    } else if (item.id === 'contact') {
                      router.push('/settings/contact' as any);
                    } else if (item.id === 'feedback') {
                      router.push('/settings/feedback' as any);
                    }
                  }}
                  style={[
                    styles.settingsRow,
                    itemIndex === section.items.length - 1 && styles.settingsRowLast,
                    item.destructive && styles.settingsRowDestructive,
                  ]}
                  android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
                >
                  <View style={[styles.settingsIcon, { backgroundColor: `${item.destructive ? '#EF4444' : '#10B981'}20` }]}>
                    <item.icon size={20} color={item.destructive ? '#EF4444' : '#10B981'} />
                  </View>
                  <View style={styles.settingsContent}>
                    <Text style={[styles.settingsTitle, item.destructive && styles.settingsTitleDestructive]}>
                      {item.title}
                    </Text>
                    <Text style={styles.settingsSubtitle}>{item.subtitle}</Text>
                  </View>
                  {!item.destructive && <ChevronRight size={20} color="#71717A" />}
                </Pressable>
              ))}
            </Card>
          </View>
        ))}

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.buildText}>Build 100 • Debug Mode</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  backButton: { position: 'absolute', top: 8, left: 8, zIndex: 10, padding: 8 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40, gap: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerLeft: { flex: 1 },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#71717A', marginTop: 2 },
  section: { gap: 12 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#71717A', textTransform: 'uppercase', letterSpacing: 0.5 },
  sectionCard: { marginHorizontal: -4 },
  settingsRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E4E4E7' },
  settingsRowLast: { borderBottomWidth: 0 },
  settingsRowDestructive: { backgroundColor: '#FEF2F2' },
  settingsIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  settingsContent: { flex: 1, minWidth: 0 },
  settingsTitle: { fontSize: 15, fontWeight: '500', color: '#09090B' },
  settingsTitleDestructive: { color: '#EF4444' },
  settingsSubtitle: { fontSize: 12, color: '#71717A', marginTop: 2 },
  versionInfo: { alignItems: 'center', paddingTop: 20, gap: 4 },
  versionText: { fontSize: 13, fontWeight: '500', color: '#71717A' },
  buildText: { fontSize: 11, color: '#71717A' },
});