'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, Phone, MessageSquare, MapPin, Clock, Send, Twitter, Github, Linkedin, Globe } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ContactUsScreen() {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeft size={24} color="#374151" />
      </Pressable>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MessageSquare size={32} color="#10B981" />
          </View>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>We\'d love to hear from you</Text>
        </View>

        <View style={styles.section}>
          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>Choose your preferred method</CardDescription>
            </CardHeader>
            <CardContent>
              <View style={styles.contactGrid}>
                <Pressable style={styles.contactCard} onPress={() => Linking.openURL('mailto:support@aifinancialcopilot.com')}>
                  <View style={styles.contactCardIcon}><Mail size={28} color="#fff" /></View>
                  <Text style={styles.contactCardTitle}>Email</Text>
                  <Text style={styles.contactCardDesc}>support@aifinancialcopilot.com</Text>
                  <Text style={styles.contactCardMeta}>Typically responds within 24h</Text>
                </Pressable>
                <Pressable style={styles.contactCard} onPress={() => Linking.openURL('tel:+918000000000')}>
                  <View style={[styles.contactCardIcon, { backgroundColor: '#06B6D4' }]}><Phone size={28} color="#fff" /></View>
                  <Text style={styles.contactCardTitle}>Phone</Text>
                  <Text style={styles.contactCardDesc}>1800-123-4567</Text>
                  <Text style={styles.contactCardMeta}>Mon-Fri, 9AM-6PM IST</Text>
                </Pressable>
                <Pressable style={styles.contactCard} onPress={() => router.push('/settings/help' as any)}>
                  <View style={[styles.contactCardIcon, { backgroundColor: '#8B5CF6' }]}><MessageSquare size={28} color="#fff" /></View>
                  <Text style={styles.contactCardTitle}>In-App Chat</Text>
                  <Text style={styles.contactCardDesc}>Live chat support</Text>
                  <Text style={styles.contactCardMeta}>Available in Help Center</Text>
                </Pressable>
              </View>
            </CardContent>
          </Card>
        </View>

        <View style={styles.section}>
          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Office Address</CardTitle>
              <CardDescription>Visit us (by appointment only)</CardDescription>
            </CardHeader>
            <CardContent>
              <Pressable style={styles.addressCard} onPress={() => Linking.openURL('https://maps.google.com/?q=AI+Financial+Copilot+Bangalore')}>
                <View style={styles.addressIcon}><MapPin size={24} color="#10B981" /></View>
                <View style={styles.addressText}>
                  <Text style={styles.addressLine}>AI Financial Copilot</Text>
                  <Text style={styles.addressLine}>123 Tech Park, Koramangala</Text>
                  <Text style={styles.addressLine}>Bangalore, Karnataka 560034</Text>
                  <Text style={styles.addressLine}>India</Text>
                </View>
                <ChevronRight size={20} color="#71717A" />
              </Pressable>
            </CardContent>
          </Card>
        </View>

        <View style={styles.section}>
          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>When our team is available</CardDescription>
            </CardHeader>
            <CardContent>
              <View style={styles.hoursList}>
                {[
                  { days: 'Monday - Friday', hours: '9:00 AM - 6:00 PM IST' },
                  { days: 'Saturday', hours: '10:00 AM - 2:00 PM IST' },
                  { days: 'Sunday', hours: 'Closed' },
                ].map((item, i) => (
                  <View key={i} style={styles.hoursRow}>
                    <Text style={styles.hoursDay}>{item.days}</Text>
                    <Text style={styles.hoursTime}>{item.hours}</Text>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </View>

        <View style={styles.section}>
          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Follow Us</CardTitle>
              <CardDescription>Stay updated on social media</CardDescription>
            </CardHeader>
            <CardContent>
              <View style={styles.socialRow}>
                <Pressable style={styles.socialButton} onPress={() => Linking.openURL('https://twitter.com/aifinancialcp')}>
                  <Twitter size={24} color="#fff" />
                </Pressable>
                <Pressable style={[styles.socialButton, { backgroundColor: '#000' }]} onPress={() => Linking.openURL('https://github.com/aifinancialcopilot')}>
                  <Github size={24} color="#fff" />
                </Pressable>
                <Pressable style={[styles.socialButton, { backgroundColor: '#0A66C2' }]} onPress={() => Linking.openURL('https://linkedin.com/company/aifinancialcopilot')}>
                  <Linkedin size={24} color="#fff" />
                </Pressable>
              </View>
            </CardContent>
          </Card>
        </View>

        <View style={styles.section}>
          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common requests</CardDescription>
            </CardHeader>
            <CardContent>
              <View style={styles.quickActions}>
                <Pressable style={styles.quickAction} onPress={() => router.push('/settings/feedback' as any)}>
                  <Send size={20} color="#10B981" />
                  <Text style={styles.quickActionText}>Send Feedback</Text>
                </Pressable>
                <Pressable style={styles.quickAction} onPress={() => router.push('/settings/help' as any)}>
                  <HelpCircle size={20} color="#10B981" />
                  <Text style={styles.quickActionText}>Help Center</Text>
                </Pressable>
                <Pressable style={styles.quickAction} onPress={() => Linking.openURL('https://aifinancialcopilot.com/privacy')}>
                  <Globe size={20} color="#10B981" />
                  <Text style={styles.quickActionText}>Privacy Policy</Text>
                </Pressable>
                <Pressable style={styles.quickAction} onPress={() => Linking.openURL('https://aifinancialcopilot.com/terms')}>
                  <Globe size={20} color="#10B981" />
                  <Text style={styles.quickActionText}>Terms of Service</Text>
                </Pressable>
              </View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  backButton: { position: 'absolute', top: 8, left: 8, zIndex: 10, padding: 8 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32, gap: 16 },
  header: { alignItems: 'center', marginBottom: 8, gap: 12 },
  headerIcon: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#09090B', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#71717A' },
  section: { marginTop: 8 },
  card: { marginBottom: 8 },
  contactGrid: { gap: 12 },
  contactCard: { flex: 1, padding: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 16, alignItems: 'center', gap: 8, minWidth: 100 },
  contactCardIcon: { width: 56, height: 56, borderRadius: 14, backgroundColor: '#10B981', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  contactCardTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  contactCardDesc: { fontSize: 14, color: '#374151' },
  contactCardMeta: { fontSize: 12, color: '#71717A', textAlign: 'center', marginTop: 4 },
  addressCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  addressIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center', marginTop: 4 },
  addressText: { flex: 1, gap: 2 },
  addressLine: { fontSize: 15, color: '#374151' },
  hoursList: { gap: 12 },
  hoursRow: { flexDirection: 'row', justifyContent: 'space-between' },
  hoursDay: { fontSize: 15, fontWeight: '500', color: '#09090B' },
  hoursTime: { fontSize: 15, color: '#71717A' },
  socialRow: { flexDirection: 'row', gap: 12 },
  socialButton: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#1DA1F2', justifyContent: 'center', alignItems: 'center' },
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  quickAction: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E4E7', borderRadius: 12 },
  quickActionText: { fontSize: 14, fontWeight: '500', color: '#09090B' },
});

const { ChevronRight, HelpCircle } = require('lucide-react-native');