'use client';

import { View, Text, Pressable, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle, AlertCircle, Shield, MessageSquare, Bell, Check } from 'lucide-react-native';
import { useAuthStore } from '@/modules/auth/store/authStore';

export default function PermissionsScreen() {
  const router = useRouter();
  const { createProfile } = useAuthStore();

  const handleBack = () => router.back();

  const handleContinue = async () => {
    router.push('/(auth)/bank-intro');
  };

  const permissions = [
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      desc: 'AES-256 encryption, read-only access',
      granted: true,
    },
    {
      icon: MessageSquare,
      title: 'SMS Reading',
      desc: 'Auto-detect transaction SMS from banks',
      granted: false,
    },
    {
      icon: Bell,
      title: 'Notifications',
      desc: 'Budget alerts, bill reminders, insights',
      granted: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Shield size={32} color="#10B981" />
          </View>
          <Text style={styles.title}>Permissions</Text>
          <Text style={styles.subtitle}>Grant access to unlock full features</Text>
        </View>

        <View style={styles.permissionsList}>
          {permissions.map((perm, i) => (
            <View key={i} style={styles.permissionCard}>
              <View style={styles.permissionIcon}>
                <perm.icon size={20} color="#10B981" />
              </View>
              <View style={[styles.permissionInfo, { flex: 1 }]}>
                <Text style={styles.permissionTitle}>{perm.title}</Text>
                <Text style={styles.permissionDesc}>{perm.desc}</Text>
              </View>
              <View style={[styles.permissionStatus, perm.granted && styles.permissionStatusGranted]}>
                <CheckCircle size={20} color={perm.granted ? '#10B981' : '#E4E4E7'} />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>Why we need these</Text>
          <View style={styles.noteItems}>
            <Text style={styles.noteItem}>• <Text style={styles.bold}>SMS:</Text> Auto-capture bank transactions from SMS</Text>
            <Text style={styles.noteItem}>• <Text style={styles.bold}>Notifications:</Text> Smart alerts for budgets & bills</Text>
            <Text style={styles.noteItem}>• <Text style={styles.bold}>Security:</Text> Your data never leaves your device</Text>
          </View>
        </View>
      </ScrollView>

      <Pressable onPress={handleContinue} style={styles.continueButton} android_ripple={{ color: 'rgba(255,255,255,0.2)' }}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  backButton: { position: 'absolute', top: 8, left: 8, zIndex: 10, padding: 8 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 100, gap: 24 },
  header: { alignItems: 'center', marginBottom: 8, gap: 12 },
  headerIcon: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#71717A' },
  permissionsList: { gap: 12 },
  permissionCard: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 14, gap: 12 },
  permissionIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  permissionInfo: { flex: 1, gap: 2 },
  permissionTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  permissionDesc: { fontSize: 13, color: '#71717A' },
  permissionStatus: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#E4E4E7', justifyContent: 'center', alignItems: 'center' },
  permissionStatusGranted: { borderColor: '#10B981', backgroundColor: '#ECFDF5' },
  noteContainer: { padding: 16, backgroundColor: '#F0FDF4', borderRadius: 14, borderWidth: 1, borderColor: '#BBF7D0' },
  noteTitle: { fontSize: 14, fontWeight: '600', color: '#166534', marginBottom: 12 },
  noteItems: { gap: 8 },
  noteItem: { fontSize: 13, color: '#166534', lineHeight: 20 },
  bold: { fontWeight: '600' },
  continueButton: { paddingVertical: 16, borderRadius: 16, backgroundColor: '#10B981', alignItems: 'center', shadowColor: '#10B981', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8, marginHorizontal: 24, marginBottom: 32 },
  continueButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});