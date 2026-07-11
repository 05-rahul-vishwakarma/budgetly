'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, Send, Star, Smile, Meh, Frown, CheckCircle, X, Loader2, Mail, Github, Zap, ChevronRight } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SendFeedbackScreen() {
  const router = useRouter();
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'general' | 'praise'>('general');
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBack = () => {
    if (showSuccess) {
      setShowSuccess(false);
      resetForm();
    } else {
      router.back();
    }
  };

  const resetForm = () => {
    setFeedbackType('general');
    setRating(0);
    setEmail('');
    setMessage('');
    setScreenshots([]);
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const types = [
    { id: 'bug', label: 'Bug Report', icon: '🐛', desc: 'Something isn\'t working' },
    { id: 'feature', label: 'Feature Request', icon: '✨', desc: 'I have an idea' },
    { id: 'general', label: 'General Feedback', icon: '💬', desc: 'General comments' },
    { id: 'praise', label: 'Praise', icon: '❤️', desc: 'Love the app!' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeft size={24} color="#374151" />
      </Pressable>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={0}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {!showSuccess ? (
            <>
              <View style={styles.header}>
                <View style={styles.headerIcon}>
                  <Send size={32} color="#10B981" />
                </View>
                <Text style={styles.title}>Send Feedback</Text>
                <Text style={styles.subtitle}>Help us make the app better</Text>
              </View>

              <Card style={styles.card}>
                <CardHeader>
                  <CardTitle>What type of feedback?</CardTitle>
                  <CardDescription>Select a category</CardDescription>
                </CardHeader>
                <CardContent>
                  <View style={styles.typeGrid}>
                    {types.map((type) => (
                      <Pressable
                        key={type.id}
                        onPress={() => setFeedbackType(type.id as any)}
                        style={[
                          styles.typeCard,
                          feedbackType === type.id && styles.typeCardSelected,
                        ]}
                      >
                        <Text style={styles.typeIcon}>{type.icon}</Text>
                        <Text style={[styles.typeLabel, feedbackType === type.id && styles.typeLabelSelected]}>{type.label}</Text>
                        <Text style={[styles.typeDesc, feedbackType === type.id && styles.typeDescSelected]}>{type.desc}</Text>
                      </Pressable>
                    ))}
                  </View>
                </CardContent>
              </Card>

              {feedbackType !== 'praise' && (
                <Card style={styles.card}>
                  <CardHeader>
                    <CardTitle>How would you rate your experience?</CardTitle>
                    <CardDescription>Tap a star to rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <View style={styles.ratingRow}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Pressable key={star} onPress={() => setRating(star)} style={styles.ratingButton}>
                          <Star
                            size={32}
                            color={star <= rating ? '#F59E0B' : '#E4E4E7'}
                            fill={star <= rating ? '#F59E0B' : 'none'}
                          />
                        </Pressable>
                      ))}
                    </View>
                    {rating > 0 && (
                      <Text style={styles.ratingText}>
                        {['Terrible', 'Poor', 'Okay', 'Good', 'Excellent'][rating - 1]}
                      </Text>
                    )}
                  </CardContent>
                </Card>
              )}

              <Card style={styles.card}>
                <CardHeader>
                  <CardTitle>Your Feedback</CardTitle>
                  <CardDescription>Tell us more (optional but helpful)</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    label="Email (optional)"
                    placeholder="your@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <Input
                    label="Message"
                    placeholder="Describe your feedback..."
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    numberOfLines={6}
                    autoFocus
                  />
                </CardContent>
              </Card>

              <Card style={styles.card}>
                <CardHeader>
                  <CardTitle>Attachments (Optional)</CardTitle>
                  <CardDescription>Add screenshots or logs</CardDescription>
                </CardHeader>
                <CardContent>
                  <Pressable style={styles.attachmentButton}>
                    <View style={styles.attachmentIcon}>
                      <Zap size={24} color="#10B981" />
                    </View>
                    <View>
                      <Text style={styles.attachmentTitle}>Add Screenshot</Text>
                      <Text style={styles.attachmentDesc}>Capture current screen</Text>
                    </View>
                    <ChevronRight size={20} color="#71717A" />
                  </Pressable>
                  {screenshots.length > 0 && (
                    <View style={styles.screenshotsList}>
                      {screenshots.map((s, i) => (
                        <View key={i} style={styles.screenshotItem}>
                          <Text style={styles.screenshotName}>{s}</Text>
                          <Pressable onPress={() => setScreenshots(screenshots.filter((_, j) => j !== i))}>
                            <X size={16} color="#EF4444" />
                          </Pressable>
                        </View>
                      ))}
                    </View>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <View style={styles.successContainer}>
              <View style={styles.successIcon}>
                <CheckCircle size={64} color="#10B981" />
              </View>
              <Text style={styles.successTitle}>Thank You!</Text>
              <Text style={styles.successDesc}>Your feedback has been sent. We appreciate you taking the time to help us improve.</Text>
              <View style={styles.successMeta}>
                <View style={styles.successMetaItem}>
                  <Mail size={18} color="#10B981" />
                  <Text style={styles.successMetaText}>Confirmation sent to {email || 'app'}</Text>
                </View>
                <View style={styles.successMetaItem}>
                  <Github size={18} color="#10B981" />
                  <Text style={styles.successMetaText}>View on GitHub</Text>
                </View>
              </View>
            </View>
          )}

          {!showSuccess && (
            <Pressable
              onPress={handleSubmit}
              disabled={!message.trim() || isSubmitting}
              style={[
                styles.submitButton,
                !message.trim() && styles.submitButtonDisabled,
                isSubmitting && styles.submitButtonLoading,
              ]}
              android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} color="#fff" style={styles.spinner} />
                  <Text style={styles.submitButtonText}>Sending...</Text>
                </>
              ) : (
                <>
                  <Send size={20} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.submitButtonText}>Send Feedback</Text>
                </>
              )}
            </Pressable>
          )}

          {showSuccess && (
            <Button variant="outline" onPress={() => { setShowSuccess(false); resetForm(); router.back(); }} style={styles.doneButton}>
              Done
            </Button>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  backButton: { position: 'absolute', top: 8, left: 8, zIndex: 10, padding: 8 },
  keyboardView: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32, gap: 16 },
  header: { alignItems: 'center', marginBottom: 8, gap: 12 },
  headerIcon: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#71717A' },
  card: { marginBottom: 8 },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  typeCard: { flex: 1, minWidth: '45%', padding: 16, backgroundColor: '#fff', borderWidth: 2, borderColor: '#E4E4E7', borderRadius: 14, alignItems: 'center', gap: 8 },
  typeCardSelected: { borderColor: '#10B981', backgroundColor: '#ECFDF5' },
  typeIcon: { fontSize: 28 },
  typeLabel: { fontSize: 14, fontWeight: '600', color: '#09090B', textAlign: 'center' },
  typeLabelSelected: { color: '#10B981' },
  typeDesc: { fontSize: 12, color: '#71717A', textAlign: 'center' },
  typeDescSelected: { color: '#059669' },
  ratingRow: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  ratingButton: { padding: 4 },
  ratingText: { textAlign: 'center', fontSize: 14, fontWeight: '500', color: '#10B981', marginTop: 8 },
  attachmentButton: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderWidth: 2, borderColor: '#E4E4E7', borderRadius: 12, borderStyle: 'dashed' },
  attachmentIcon: { width: 44, height: 44, borderRadius: 10, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  attachmentTitle: { fontSize: 16, fontWeight: '500', color: '#09090B' },
  attachmentDesc: { fontSize: 13, color: '#71717A', marginTop: 2 },
  screenshotsList: { gap: 8, marginTop: 12 },
  screenshotItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 10 },
  screenshotName: { fontSize: 14, color: '#374151' },
  submitButton: { paddingVertical: 16, borderRadius: 16, backgroundColor: '#10B981', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, shadowColor: '#10B981', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  submitButtonDisabled: { backgroundColor: '#93C5FD', shadowOpacity: 0, elevation: 0 },
  submitButtonLoading: { backgroundColor: '#059669' },
  submitButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  spinner: { marginRight: 4 },
  doneButton: { marginTop: 16 },
  successContainer: { alignItems: 'center', paddingVertical: 40, gap: 16 },
  successIcon: { marginBottom: 8 },
  successTitle: { fontSize: 24, fontWeight: '700', color: '#09090B' },
  successDesc: { fontSize: 16, color: '#71717A', textAlign: 'center', lineHeight: 24, paddingHorizontal: 16 },
  successMeta: { gap: 12, marginTop: 8 },
  successMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#ECFDF5', borderRadius: 10 },
  successMetaText: { fontSize: 14, fontWeight: '500', color: '#059669' },
});