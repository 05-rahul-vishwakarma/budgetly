'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, Trash2, AlertTriangle, Shield, UserMinus, Lock, CheckCircle, X, Loader2, Eye, EyeOff } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Badge } from '@/shared/components/ui/Badge';

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'confirm' | 'verify' | 'final'>('confirm');
  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBack = () => {
    if (step === 'confirm') router.back();
    else setStep(prev => prev === 'final' ? 'verify' : 'confirm');
  };

  const handleConfirm = () => {
    if (confirmText.toUpperCase() === 'DELETE') setStep('verify');
  };

  const handleVerify = async () => {
    if (!password) return;
    setStep('final');
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsDeleting(false);
    setShowSuccess(true);
  };

  const steps = [
    { id: 'confirm', label: 'Confirm', title: 'Type DELETE to continue' },
    { id: 'verify', label: 'Verify', title: 'Enter your password' },
    { id: 'final', label: 'Delete', title: 'Final confirmation' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeft size={24} color="#374151" />
      </Pressable>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          {steps.map((s, i) => {
            const currentStepIndex = steps.findIndex(st => st.id === step);
            const isActive = currentStepIndex >= i;
            const isComplete = currentStepIndex > i;
            return (
              <View key={s.id} style={styles.stepWrapper}>
                <View style={[
                  styles.stepCircle,
                  isActive && styles.stepCircleActive,
                  isComplete && styles.stepCircleComplete,
                ]}>
                  {isComplete ? <CheckCircle size={16} color="#fff" /> : <Text style={styles.stepNumber}>{i + 1}</Text>}
                </View>
                {i < steps.length - 1 && <View style={[
                  styles.stepLine,
                  isComplete && styles.stepLineActive,
                ]} />}
              </View>
            );
          })}
        </View>

        {!showSuccess ? (
          <>
            <View style={styles.header}>
              <View style={styles.headerIcon}>
                <Trash2 size={32} color="#EF4444" />
              </View>
              <Text style={styles.title}>Delete Account</Text>
              <Text style={styles.subtitle}>{steps.find(s => s.id === step)?.title}</Text>
            </View>

            {step === 'confirm' && (
              <>
                <Card style={styles.card}>
                  <CardHeader>
                    <CardTitle>⚠️ This action is irreversible</CardTitle>
                    <CardDescription>Please read carefully before proceeding</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <View style={styles.warningList}>
                      {[
                        'All your data will be permanently deleted',
                        'Transactions, budgets, and categories cannot be recovered',
                        'Connected bank accounts will be disconnected',
                        'You will lose access to all historical insights',
                        'This cannot be undone',
                      ].map((item, i) => (
                        <View key={i} style={styles.warningItem}>
                          <AlertTriangle size={20} color="#EF4444" />
                          <Text style={styles.warningText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  </CardContent>
                </Card>

                <Card style={styles.card}>
                  <CardHeader>
                    <CardTitle>Type "DELETE" to confirm</CardTitle>
                    <CardDescription>This confirms you understand the consequences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input
                      label="Confirmation"
                      placeholder="DELETE"
                      value={confirmText}
                      onChangeText={setConfirmText}
                      autoCapitalize="characters"
                      autoFocus
                      error={confirmText && confirmText.toUpperCase() !== 'DELETE' ? 'Must type exactly "DELETE"' : undefined}
                    />
                  </CardContent>
                </Card>

                <Pressable
                  onPress={handleConfirm}
                  disabled={confirmText.toUpperCase() !== 'DELETE'}
                  style={[
                    styles.nextButton,
                    confirmText.toUpperCase() !== 'DELETE' && styles.nextButtonDisabled,
                  ]}
                >
                  <Text style={styles.nextButtonText}>Continue</Text>
                </Pressable>
              </>
            )}

            {step === 'verify' && (
              <>
                <Card style={styles.card}>
                  <CardHeader>
                    <CardTitle>Verify Your Identity</CardTitle>
                    <CardDescription>Enter your password to confirm it's you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input
                      label="Password"
                      placeholder="Enter your password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      rightIcon={<Pressable onPress={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={20} color="#71717A" /> : <Eye size={20} color="#71717A" />}</Pressable>}
                      autoFocus
                    />
                  </CardContent>
                </Card>

                <Pressable onPress={handleVerify} disabled={!password} style={[styles.nextButton, !password && styles.nextButtonDisabled]}>
                  <Text style={styles.nextButtonText}>Verify & Continue</Text>
                </Pressable>
              </>
            )}

            {step === 'final' && (
              <>
                <Card style={[styles.card, styles.cardDanger]}>
                  <CardHeader>
                    <View style={styles.dangerIcon}>
                      <AlertTriangle size={28} color="#EF4444" />
                    </View>
                    <CardTitle>Final Warning</CardTitle>
                    <CardDescription>This is your last chance to cancel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <View style={styles.finalWarning}>
                      <View style={styles.finalWarningItem}>
                        <Shield size={20} color="#EF4444" />
                        <Text style={styles.finalWarningText}>Account: {password ? 'Verified' : 'Not verified'}</Text>
                      </View>
                      <View style={styles.finalWarningItem}>
                        <UserMinus size={20} color="#EF4444" />
                        <Text style={styles.finalWarningText}>All data will be erased</Text>
                      </View>
                      <View style={styles.finalWarningItem}>
                        <Lock size={20} color="#EF4444" />
                        <Text style={styles.finalWarningText}>Action cannot be undone</Text>
                      </View>
                    </View>
                  </CardContent>
                </Card>

                <Pressable
                  onPress={handleDelete}
                  disabled={isDeleting}
                  style={[styles.deleteButton, isDeleting && styles.deleteButtonLoading]}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 size={20} color="#fff" style={styles.spinner} />
                      <Text style={styles.deleteButtonText}>Deleting Account...</Text>
                    </>
                  ) : (
                    <>
                      <Trash2 size={20} color="#fff" style={{ marginRight: 8 }} />
                      <Text style={styles.deleteButtonText}>Permanently Delete Account</Text>
                    </>
                  )}
                </Pressable>
              </>
            )}
          </>
        ) : (
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <CheckCircle size={64} color="#10B981" />
            </View>
            <Text style={styles.successTitle}>Account Deleted</Text>
            <Text style={styles.successDesc}>Your account and all associated data have been permanently deleted. We're sorry to see you go.</Text>
            <View style={styles.successInfo}>
              <Text style={styles.successInfoText}>A confirmation email has been sent</Text>
              <Text style={styles.successInfoText}>Data will be purged within 30 days</Text>
            </View>
          </View>
        )}

        {showSuccess && (
          <Button variant="outline" onPress={() => router.replace('/(auth)/welcome' as any)} style={styles.doneButton}>
            Return to Welcome
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  backButton: { position: 'absolute', top: 8, left: 8, zIndex: 10, padding: 8 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32, gap: 16 },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stepWrapper: { flex: 1, alignItems: 'center' },
  stepCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E4E4E7', justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  stepCircleActive: { backgroundColor: '#EF4444' },
  stepCircleComplete: { backgroundColor: '#10B981' },
  stepNumber: { fontSize: 14, fontWeight: '600', color: '#71717A' },
  stepLine: { flex: 1, height: 2, backgroundColor: '#E4E4E7', marginHorizontal: -16 },
  stepLineActive: { backgroundColor: '#EF4444' },
  header: { alignItems: 'center', marginBottom: 8, gap: 12 },
  headerIcon: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#FEF2F2', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#71717A' },
  card: { marginBottom: 8 },
  cardDanger: { borderWidth: 2, borderColor: '#EF4444', backgroundColor: '#FEF2F2' },
  dangerIcon: { width: 56, height: 56, borderRadius: 14, backgroundColor: '#FEE2E2', justifyContent: 'center', alignItems: 'center', marginBottom: 12, alignSelf: 'center' },
  warningList: { gap: 12 },
  warningItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  warningText: { fontSize: 15, color: '#374151', lineHeight: 22, flex: 1 },
  finalWarning: { gap: 12 },
  finalWarningItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  finalWarningText: { fontSize: 15, fontWeight: '500', color: '#374151' },
  nextButton: { paddingVertical: 16, borderRadius: 16, backgroundColor: '#10B981', alignItems: 'center', shadowColor: '#10B981', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  nextButtonDisabled: { backgroundColor: '#93C5FD', shadowOpacity: 0, elevation: 0 },
  nextButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  deleteButton: { paddingVertical: 16, borderRadius: 16, backgroundColor: '#EF4444', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, shadowColor: '#EF4444', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  deleteButtonLoading: { backgroundColor: '#DC2626' },
  deleteButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  spinner: { marginRight: 4 },
  doneButton: { marginTop: 16 },
  successContainer: { alignItems: 'center', paddingVertical: 40, gap: 16 },
  successIcon: { marginBottom: 8 },
  successTitle: { fontSize: 24, fontWeight: '700', color: '#09090B' },
  successDesc: { fontSize: 16, color: '#71717A', textAlign: 'center', lineHeight: 24, paddingHorizontal: 16 },
  successInfo: { gap: 8, marginTop: 8 },
  successInfoText: { fontSize: 14, color: '#71717A' },
});