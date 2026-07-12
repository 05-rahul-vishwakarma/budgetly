'use client';

import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react-native';
import { useAuthStore } from '@/modules/auth/store/authStore';

export default function PhoneScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{0,5})(\d{0,5})/, (_, p1, p2) => p2 ? `${p1} ${p2}` : p1);
    }
    return cleaned.slice(0, 10).replace(/(\d{0,5})(\d{0,5})/, (_, p1, p2) => p2 ? `${p1} ${p2}` : p1);
  };

  const handleChange = (text: string) => {
    const formatted = formatPhone(text);
    setPhone(formatted);
    setIsValid(formatted.replace(/\s/g, '').length === 10);
  };

  const handleSubmit = async () => {
    if (!isValid || isLoading) return;
    setIsLoading(true);
    await login(`+91 ${phone.replace(/\s/g, '')}`);
    router.push('/(auth)/otp');
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={0}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Enter your phone number</Text>
            <Text style={styles.subtitle}>We'll send you a 6-digit OTP to verify your account</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={handleChange}
                placeholder="98765 43210"
                keyboardType="phone-pad"
                maxLength={11}
                autoFocus
                textContentType="telephoneNumber"
              />
            </View>
          </View>

          {isValid && (
            <View style={styles.successRow}>
              <CheckCircle size={16} color="#22C55E" />
              <Text style={styles.successText}>Valid Indian phone number</Text>
            </View>
          )}

          <View style={styles.helpText}>
            <Text style={styles.helpTextContent}>
              By continuing, you agree to our{' '}
              <Text style={styles.link}>Terms of Service</Text>{' '}and{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>
        </View>

        <Pressable
          onPress={handleSubmit}
          disabled={!isValid || isLoading}
          style={[
            styles.continueButton,
            !isValid && styles.continueButtonDisabled,
            isLoading && styles.continueButtonLoading,
          ]}
          android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
        >
          {isLoading ? (
            <Text style={styles.buttonText}>Sending OTP...</Text>
          ) : (
            <>
              <Text style={styles.buttonText}>Continue</Text>
              <ArrowRight size={20} color="#fff" />
            </>
          )}
        </Pressable>

        <View style={styles.bottomNote}>
          <Text style={styles.bottomNoteText}>This app works with all major Indian banks</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#09090B',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#71717A',
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E4E4E7',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
  },
  countryCode: {
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: '#E4E4E7',
    marginRight: 16,
  },
  countryCodeText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#09090B',
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#09090B',
    letterSpacing: 2,
  },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingHorizontal: 4,
  },
  successText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#22C55E',
  },
  helpText: {
    marginTop: 24,
  },
  helpTextContent: {
    fontSize: 12,
    color: '#71717A',
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: '#10B981',
    fontWeight: '500',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#93C5FD',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonLoading: {
    backgroundColor: '#059669',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  bottomNote: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  bottomNoteText: {
    fontSize: 12,
    color: '#71717A',
    textAlign: 'center',
  },
});
