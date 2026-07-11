'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Switch, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Shield, Fingerprint, Lock, Key, ChevronRight, ArrowLeft, ToggleLeft, ToggleRight, AlertCircle, CheckCircle, X } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Badge as BadgeUI } from '@/shared/components/ui/Badge';

export default function SecurityScreen() {
  const router = useRouter();
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');

  const handleBack = () => router.back();

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (passwords.new.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    setShowChangePassword(false);
    setPasswords({ current: '', new: '', confirm: '' });
    setPasswordError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeft size={24} color="#374151" />
      </Pressable>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Security</Text>
          <Text style={styles.subtitle}>Protect your account and data</Text>
        </View>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Biometric Authentication</CardTitle>
            <CardDescription>Use Face ID / Touch ID to unlock the app</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                  <Fingerprint size={20} color="#10B981" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Face ID / Touch ID</Text>
                  <Text style={styles.settingSubtitle}>Unlock app with biometrics</Text>
                </View>
              </View>
              <Pressable onPress={() => setBiometricEnabled(!biometricEnabled)} style={styles.switchContainer}>
                <Switch
                  value={biometricEnabled}
                  onValueChange={setBiometricEnabled}
                  trackColor={{ false: '#E4E4E7', true: '#10B981' }}
                  thumbColor={biometricEnabled ? '#fff' : '#fff'}
                />
              </Pressable>
            </View>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Add an extra layer of security to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                  <Shield size={20} color={twoFAEnabled ? '#10B981' : '#71717A'} />
                </View>
                <View>
                  <Text style={styles.settingTitle}>2FA Status</Text>
                  <Text style={styles.settingSubtitle}>{twoFAEnabled ? 'Enabled' : 'Disabled'}</Text>
                </View>
              </View>
              <Pressable onPress={() => setTwoFAEnabled(!twoFAEnabled)} style={styles.switchContainer}>
                <Switch
                  value={twoFAEnabled}
                  onValueChange={setTwoFAEnabled}
                  trackColor={{ false: '#E4E4E7', true: '#10B981' }}
                />
              </Pressable>
            </View>
            {!twoFAEnabled && (
              <Pressable style={styles.actionButton} onPress={() => {}}>
                <Text style={styles.actionButtonText}>Set up 2FA</Text>
                <ChevronRight size={16} color="#71717A" />
              </Pressable>
            )}
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <Pressable style={styles.actionButton} onPress={() => setShowChangePassword(true)}>
              <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                  <Lock size={20} color="#71717A" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Change Password</Text>
                  <Text style={styles.settingSubtitle}>Update your login password</Text>
                </View>
              </View>
              <ChevronRight size={16} color="#71717A" />
            </Pressable>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Security Keys</CardTitle>
            <CardDescription>Manage hardware security keys</CardDescription>
          </CardHeader>
          <CardContent>
            <Pressable style={styles.actionButton}>
              <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                  <Key size={20} color="#71717A" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Add Security Key</Text>
                  <Text style={styles.settingSubtitle}>Register a hardware security key</Text>
                </View>
              </View>
              <ChevronRight size={16} color="#71717A" />
            </Pressable>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>Manage devices logged into your account</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.sessionItem}>
              <View style={styles.sessionInfo}>
                <View style={styles.deviceIcon}>
                  <Smartphone size={20} color="#10B981" />
                </View>
                <View>
                  <Text style={styles.sessionTitle}>iPhone 15 Pro</Text>
                  <Text style={styles.sessionSubtitle}>Current device · Active now</Text>
                </View>
              </View>
              <BadgeUI variant="success">Current</BadgeUI>
            </View>
            <View style={styles.divider} />
            <View style={styles.sessionItem}>
              <View style={styles.sessionInfo}>
                <View style={styles.deviceIcon}>
                  <Monitor size={20} color="#71717A" />
                </View>
                <View>
                  <Text style={styles.sessionTitle}>MacBook Pro</Text>
                  <Text style={styles.sessionSubtitle}>Chrome on macOS · 2 days ago</Text>
                </View>
              </View>
              <Pressable style={styles.sessionAction} onPress={() => {}}>
                <Text style={styles.sessionActionText}>Revoke</Text>
              </Pressable>
            </View>
          </CardContent>
        </Card>
      </ScrollView>

      <Modal visible={showChangePassword} animationType="slide" transparent={true}>
        <Pressable onPress={() => setShowChangePassword(false)} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change Password</Text>
              <Pressable onPress={() => setShowChangePassword(false)} style={styles.modalClose}>
                <X size={24} color="#71717A" />
              </Pressable>
            </View>
            <View style={styles.modalBody}>
              <Input
                label="Current Password"
                placeholder="Enter current password"
                secureTextEntry
                value={passwords.current}
                onChangeText={(v) => setPasswords({ ...passwords, current: v })}
              />
              <Input
                label="New Password"
                placeholder="Enter new password"
                secureTextEntry
                value={passwords.new}
                onChangeText={(v) => setPasswords({ ...passwords, new: v })}
              />
              <Input
                label="Confirm New Password"
                placeholder="Confirm new password"
                secureTextEntry
                value={passwords.confirm}
                onChangeText={(v) => setPasswords({ ...passwords, confirm: v })}
                error={passwordError}
              />
            </View>
            <View style={styles.modalFooter}>
              <Button variant="outline" onPress={() => setShowChangePassword(false)}>Cancel</Button>
              <Button onPress={handleChangePassword}>Update Password</Button>
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
  header: { marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#71717A', marginTop: 4 },
  card: { marginBottom: 8 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  settingInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  iconContainer: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  settingTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  settingSubtitle: { fontSize: 13, color: '#71717A', marginTop: 2 },
  switchContainer: { paddingVertical: 4 },
  actionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  actionButtonText: { fontSize: 16, fontWeight: '500', color: '#10B981', marginRight: 8 },
  divider: { height: 1, backgroundColor: '#E4E4E7', marginHorizontal: -16 },
  sessionItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  sessionInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  deviceIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  sessionTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  sessionSubtitle: { fontSize: 13, color: '#71717A', marginTop: 2 },
  sessionAction: { paddingHorizontal: 12, paddingVertical: 6 },
  sessionActionText: { fontSize: 14, fontWeight: '500', color: '#EF4444' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#09090B' },
  modalClose: { padding: 8 },
  modalBody: { gap: 16, marginBottom: 24 },
  modalFooter: { flexDirection: 'row', gap: 12, justifyContent: 'flex-end' },
});

const { Smartphone, Monitor } = require('lucide-react-native');