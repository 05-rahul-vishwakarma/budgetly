'use client';

import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Camera, UserPlus, Shield, CheckCircle, ArrowLeft } from 'lucide-react-native';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { Avatar } from '@/components/ui/Avatar';

export default function ProfileScreen() {
  const router = useRouter();
  const { createProfile } = useAuthStore();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || isLoading) return;
    setIsLoading(true);
    await createProfile(name.trim());
    setIsLoading(false);
    router.push('/(auth)/permissions');
  };

  const handleBack = () => {
    router.back();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getColor = (name: string) => {
    const colors = [
      '#10B981', '#2563EB', '#22C55E', '#F59E0B', '#EF4444',
      '#8B5CF6', '#EC4899', '#06B6D4', '#6366F1', '#F97316',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={0}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ArrowLeft size={24} color="#374151" />
          </Pressable>
          <View style={styles.header}>
            <Text style={styles.title}>Create your profile</Text>
            <Text style={styles.subtitle}>This helps us personalize your experience</Text>
          </View>

          <View style={styles.avatarSection}>
            <Avatar
              size="2xl"
              name={name || 'Alex Johnson'}
              src={avatar}
              fallback={getInitials(name || 'AJ')}
            />
            <Pressable
              onPress={() => setShowImagePicker(true)}
              style={styles.avatarButton}
            >
              <Camera size={20} color="#fff" />
            </Pressable>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              autoCapitalize="words"
              autoFocus
              textContentType="name"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </View>

          <View style={styles.features}>
            <View style={styles.feature}>
              <View style={styles.featureIcon}><Shield size={20} color="#10B981" /></View>
              <View>
                <Text style={styles.featureTitle}>Bank-grade security</Text>
                <Text style={styles.featureDesc}>Your data is encrypted and secure</Text>
              </View>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureIcon}><UserPlus size={20} color="#10B981" /></View>
              <View>
                <Text style={styles.featureTitle}>Personalized insights</Text>
                <Text style={styles.featureDesc}>Get tailored financial advice</Text>
              </View>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureIcon}><CheckCircle size={20} color="#10B981" /></View>
              <View>
                <Text style={styles.featureTitle}>Quick setup</Text>
                <Text style={styles.featureDesc}>Start tracking in minutes</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <Pressable
          onPress={handleSubmit}
          disabled={!name.trim() || isLoading}
          style={[
            styles.continueButton,
            !name.trim() && styles.continueButtonDisabled,
            isLoading && styles.continueButtonLoading,
          ]}
          android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
        >
          {isLoading ? (
            <Text style={styles.buttonText}>Creating profile...</Text>
          ) : (
            <>
              <Text style={styles.buttonText}>Get Started</Text>
            </>
          )}
        </Pressable>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 8,
    zIndex: 1,
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
    textAlign: 'center',
    lineHeight: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  avatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#F8FAFC',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  inputSection: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    height: 56,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E4E4E7',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#09090B',
  },
  features: {
    gap: 16,
    marginBottom: 32,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 14,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#09090B',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 13,
    color: '#71717A',
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#10B981',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    marginHorizontal: 24,
    marginBottom: 32,
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
});
