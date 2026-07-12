import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, RefreshCw, CheckCircle } from 'lucide-react-native';
import { useAuthStore } from '@/modules/auth/store/authStore';

export default function OTPScreen() {
  const router = useRouter();
  const { verifyOTP } = useAuthStore();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer(prev => prev - 1);
      } else {
        setCanResend(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0]?.focus();
    }
  }, []);

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (newOtp.every(d => d !== '')) {
      handleSubmit();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6 || isLoading) return;
    
    setIsLoading(true);
    setError('');
    
    await verifyOTP(otpString);
    
    setIsLoading(false);
    router.replace('/(auth)/profile');
  };

  const handleResend = () => {
    if (!canResend) return;
    setResendTimer(60);
    setCanResend(false);
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
            <Text style={styles.title}>Enter the 6-digit code</Text>
            <Text style={styles.subtitle}>
              We've sent an OTP to <Text style={styles.phoneNumber}>+91 98765 43210</Text>
            </Text>
          </View>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleOTPChange(index, value)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                maxLength={1}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoFocus={index === 0}
                secureTextEntry
                autoComplete="one-time-code"
              />
            ))}
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <Pressable onPress={handleResend} disabled={!canResend} style={styles.resendContainer}>
            {canResend ? (
              <Text style={styles.resendText}>Resend OTP</Text>
            ) : (
              <Text style={styles.resendTimer}>Resend in {resendTimer}s</Text>
            )}
            <RefreshCw size={16} color="#10B981" />
          </Pressable>
        </View>

        <View style={styles.bottomActions}>
          <Pressable
            onPress={() => router.back()}
            style={styles.changeNumberButton}
          >
            <Text style={styles.changeNumberText}>Change phone number</Text>
          </Pressable>
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
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#09090B',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#71717A',
    textAlign: 'center',
    lineHeight: 24,
  },
  phoneNumber: {
    fontWeight: '600',
    color: '#10B981',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  otpInput: {
    width: 52,
    height: 56,
    borderWidth: 2,
    borderColor: '#E4E4E7',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#09090B',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  resendText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  resendTimer: {
    fontSize: 14,
    color: '#71717A',
  },
  bottomActions: {
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  changeNumberButton: {
    paddingVertical: 8,
  },
  changeNumberText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
});