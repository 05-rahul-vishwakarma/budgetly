'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Switch, Modal, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { User, Bell, Shield, Moon, Sun, Monitor, Palette, Trash2, LogOut, ChevronRight, Settings, CreditCard, Smartphone, Key, Info, Mail, Twitter, Github, Shield as ShieldIcon, Check, X, ArrowLeft, Target, MessageSquare, HelpCircle, FileText, Gavel, Linkedin, ChevronDown, ChevronUp } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Badge } from '@/shared/components/ui/Badge';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Input } from '@/shared/components/ui/Input';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { useUIStore } from '@/shared/stores';

interface SettingsItem {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  destructive?: boolean;
}

const settingsSections = [
  {
    title: 'Account',
    items: [
      { id: 'profile', title: 'Profile', subtitle: 'Manage your personal information', icon: User },
      { id: 'security', title: 'Security', subtitle: 'Password, biometrics & 2FA', icon: Shield },
      { id: 'notifications', title: 'Notifications', subtitle: 'Manage notification preferences', icon: Bell },
      { id: 'appearance', title: 'Appearance', subtitle: 'Theme, colors & display', icon: Palette },
    ] as SettingsItem[],
  },
  {
    title: 'Features',
    items: [
      { id: 'banks', title: 'Connected Banks', subtitle: 'Manage bank connections', icon: CreditCard },
      { id: 'categories', title: 'Categories', subtitle: 'Customize spending categories', icon: Target },
      { id: 'budgets', title: 'Budgets', subtitle: 'Budget settings & alerts', icon: Target },
    ] as SettingsItem[],
  },
  {
    title: 'Privacy & Legal',
    items: [
      { id: 'privacy', title: 'Privacy Policy', subtitle: 'How we protect your data', icon: ShieldIcon },
      { id: 'terms', title: 'Terms of Service', subtitle: 'Usage terms & conditions', icon: Gavel },
      { id: 'data', title: 'Data & Storage', subtitle: 'Manage your data & export', icon: Settings },
    ] as SettingsItem[],
  },
  {
    title: 'Support',
    items: [
      { id: 'help', title: 'Help Center', subtitle: 'FAQs & guides', icon: HelpCircle },
      { id: 'contact', title: 'Contact Us', subtitle: 'Get in touch with support', icon: Mail },
      { id: 'feedback', title: 'Send Feedback', subtitle: 'Help us improve', icon: MessageSquare },
    ] as SettingsItem[],
  },
  {
    title: 'Danger Zone',
    items: [
      { id: 'delete', title: 'Delete Account', subtitle: 'Permanently delete your account', icon: Trash2, destructive: true },
    ] as SettingsItem[],
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout, updatePreferences } = useAuthStore();
  const { theme, setTheme } = useUIStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const getThemeLabel = (t: string) => {
    switch (t) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      default: return 'System';
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    updatePreferences({ theme: newTheme });
  };

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your preferences</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Card style={styles.profileCard} padding="lg">
          <View style={styles.profileInfo}>
            <Avatar size="xl" name={user?.name} fallback="R" src={user?.avatar} />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{user?.name || 'Rahul Sharma'}</Text>
              <Text style={styles.profileEmail}>{user?.phone || '+91 98765 43210'}</Text>
              <Text style={styles.profileMember}>Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}</Text>
            </View>
          </View>
          <CardFooter>
            <Button variant="outline" size="sm" onPress={() => router.push('/profile/edit' as any)}>
              Edit Profile
            </Button>
          </CardFooter>
        </Card>

        {settingsSections.map((section, sectionIndex) => (
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

        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <View style={styles.logoutContent}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </View>
        </Pressable>

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.buildText}>Build 100 • Debug Mode</Text>
        </View>
      </ScrollView>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Trash2 size={48} color="#EF4444" />
              <Text style={styles.modalTitle}>Delete Account</Text>
              <Text style={styles.modalDesc}>
                This action is irreversible. All your data, transactions, budgets, and connected banks will be permanently deleted.
              </Text>
            </View>

            <View style={styles.modalField}>
              <Text style={styles.modalLabel}>Type "DELETE" to confirm</Text>
              <Input
                placeholder="DELETE"
                value={deleteConfirmation}
                onChangeText={setDeleteConfirmation}
                autoCapitalize="characters"
                autoFocus
              />
            </View>

            <View style={styles.modalFooter}>
              <Button variant="ghost" onPress={() => { setShowDeleteModal(false); setDeleteConfirmation(''); }}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onPress={deleteConfirmation === 'DELETE' ? () => { handleLogout(); setShowDeleteModal(false); } : undefined}
                disabled={deleteConfirmation !== 'DELETE'}
              >
                Delete Account
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#09090B',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#71717A',
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 24,
  },
  profileCard: {
    marginHorizontal: -4,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#09090B',
  },
  profileEmail: {
    fontSize: 14,
    color: '#71717A',
    marginTop: 2,
  },
  profileMember: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 6,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#71717A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionCard: {
    marginHorizontal: -4,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  settingsRowLast: {
    borderBottomWidth: 0,
  },
  settingsRowDestructive: {
    backgroundColor: '#FEF2F2',
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsContent: {
    flex: 1,
    minWidth: 0,
  },
  settingsTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#09090B',
  },
  settingsTitleDestructive: {
    color: '#EF4444',
  },
  settingsSubtitle: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 8,
    marginHorizontal: -4,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  versionInfo: {
    alignItems: 'center',
    paddingTop: 20,
    gap: 4,
  },
  versionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#71717A',
  },
  buildText: {
    fontSize: 11,
    color: '#71717A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    gap: 20,
  },
  modalHeader: {
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#09090B',
  },
  modalDesc: {
    fontSize: 14,
    color: '#71717A',
    textAlign: 'center',
    lineHeight: 20,
  },
  modalField: {
    gap: 8,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 8,
  },
});
