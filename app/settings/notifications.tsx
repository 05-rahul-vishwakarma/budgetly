'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, ChevronRight, ArrowLeft, BellRing, BellOff, Moon, Mail, Smartphone, Globe, AlertTriangle, CheckCircle } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function NotificationsScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const [categories, setCategories] = useState([
    { id: 'transactions', title: 'Transactions', subtitle: 'New transactions & spending alerts', icon: Smartphone, enabled: true, critical: false },
    { id: 'budgets', title: 'Budgets', subtitle: 'Budget limits & overspending warnings', icon: AlertTriangle, enabled: true, critical: false },
    { id: 'bills', title: 'Bills & Subscriptions', subtitle: 'Upcoming payments & renewals', icon: Globe, enabled: true, critical: true },
    { id: 'security', title: 'Security', subtitle: 'Login alerts & suspicious activity', icon: CheckCircle, enabled: true, critical: true },
    { id: 'insights', title: 'Weekly Insights', subtitle: 'Spending summaries & tips', icon: BellRing, enabled: false, critical: false },
    { id: 'marketing', title: 'Product Updates', subtitle: 'New features & announcements', icon: Mail, enabled: false, critical: false },
  ]);

  const handleBack = () => router.back();

  const toggleCategory = (id: string) => {
    setCategories(categories.map((c: any) => c.id === id ? { ...c, enabled: !c.enabled } : c));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeft size={24} color="#374151" />
      </Pressable>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>Manage how we notify you</Text>
        </View>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Delivery Methods</CardTitle>
            <CardDescription>Choose how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                  <BellRing size={20} color="#10B981" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Push Notifications</Text>
                  <Text style={styles.settingSubtitle}>Receive alerts on your device</Text>
                </View>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: '#E4E4E7', true: '#10B981' }}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                  <Mail size={20} color="#71717A" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Email Notifications</Text>
                  <Text style={styles.settingSubtitle}>Receive updates via email</Text>
                </View>
              </View>
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{ false: '#E4E4E7', true: '#10B981' }}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                  <Smartphone size={20} color="#71717A" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>SMS Notifications</Text>
                  <Text style={styles.settingSubtitle}>Receive critical alerts via SMS</Text>
                </View>
              </View>
              <Switch
                value={smsEnabled}
                onValueChange={setSmsEnabled}
                trackColor={{ false: '#E4E4E7', true: '#10B981' }}
              />
            </View>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Notification Categories</CardTitle>
            <CardDescription>Customize what you want to be notified about</CardDescription>
          </CardHeader>
          <CardContent>
            {categories.map((cat: any, index: number) => (
              <View key={cat.id} style={[styles.categoryRow, index > 0 && styles.dividerTop]}>
                <View style={styles.settingInfo}>
                  <View style={[
                    styles.iconContainer,
                    cat.critical ? styles.iconCritical : {}
                  ]}>
                    <cat.icon size={20} color={cat.critical ? '#EF4444' : cat.enabled ? '#10B981' : '#71717A'} />
                  </View>
                  <View>
                    <View style={styles.categoryHeader}>
                      <Text style={styles.settingTitle}>{cat.title}</Text>
                      {cat.critical && <Badge variant="error">Critical</Badge>}
                    </View>
                    <Text style={styles.settingSubtitle}>{cat.subtitle}</Text>
                  </View>
                </View>
                <Switch
                  value={cat.enabled}
                  onValueChange={() => toggleCategory(cat.id)}
                  trackColor={{ false: '#E4E4E7', true: cat.critical ? '#EF4444' : '#10B981' }}
                  disabled={cat.critical}
                />
              </View>
            ))}
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Quiet Hours</CardTitle>
            <CardDescription>Silence non-critical notifications during set hours</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                  <Moon size={20} color="#71717A" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Enable Quiet Hours</Text>
                  <Text style={styles.settingSubtitle}>10:00 PM - 7:00 AM</Text>
                </View>
              </View>
              <Switch
                value={false}
                onValueChange={() => {}}
                trackColor={{ false: '#E4E4E7', true: '#10B981' }}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                  <BellOff size={20} color="#71717A" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Allow Critical Alerts</Text>
                  <Text style={styles.settingSubtitle}>Always notify for security & bills</Text>
                </View>
              </View>
              <Switch
                value={true}
                onValueChange={() => {}}
                trackColor={{ false: '#E4E4E7', true: '#10B981' }}
              />
            </View>
          </CardContent>
        </Card>
      </ScrollView>
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
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
  divider: { height: 1, backgroundColor: '#E4E4E7', marginHorizontal: -16 },
  dividerTop: { paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E4E4E7', marginTop: 4 },
  categoryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
  settingInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  categoryHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconContainer: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center' },
  iconCritical: { backgroundColor: '#FEF2F2' },
  settingTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  settingSubtitle: { fontSize: 13, color: '#71717A', marginTop: 2 },
});

const { useState } = require('react');