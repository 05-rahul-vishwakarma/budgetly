'use client';

import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { ArrowLeft, Sun, Moon, Monitor, Palette, ChevronRight, CheckCircle } from 'lucide-react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { useUIStore } from '@/stores';
import { useColorScheme } from 'react-native';

export default function AppearanceScreen() {
  const router = useRouter();
  const { theme, setTheme } = useUIStore();
  const systemColorScheme = useColorScheme();

  const handleBack = () => router.back();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <ArrowLeft size={24} color="#374151" />
      </Pressable>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Appearance</Text>
          <Text style={styles.subtitle}>Customize how the app looks</Text>
        </View>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>Choose your preferred color scheme</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.themeOptions}>
              {(['light', 'dark', 'system'] as const).map((t) => (
                <Pressable
                  key={t}
                  onPress={() => handleThemeChange(t)}
                  style={[
                    styles.themeOption,
                    theme === t && styles.themeOptionSelected,
                    t === 'system' && styles.themeOptionLast,
                  ]}
                >
                  <View style={[
                    styles.themeIcon,
                    theme === t ? styles.themeIconActive : {},
                    t === 'light' && styles.themeIconLight,
                    t === 'dark' && styles.themeIconDark,
                    t === 'system' && styles.themeIconSystem,
                  ]}>
                    {t === 'light' && <Sun size={24} color={theme === t ? '#fff' : '#F59E0B'} />}
                    {t === 'dark' && <Moon size={24} color={theme === t ? '#fff' : '#6366F1'} />}
                    {t === 'system' && <Monitor size={24} color={theme === t ? '#fff' : '#71717A'} />}
                  </View>
                  <View style={styles.themeInfo}>
                    <Text style={[styles.themeTitle, theme === t && styles.themeTitleActive]}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Text>
                    <Text style={[styles.themeSubtitle, theme === t && styles.themeSubtitleActive]}>
                      {t === 'light' ? 'Always light mode' : t === 'dark' ? 'Always dark mode' : `Follows system (${systemColorScheme || 'light'})`}
                    </Text>
                  </View>
                  {theme === t && <CheckCircle size={24} color="#10B981" />}
                </Pressable>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>App Icon</CardTitle>
            <CardDescription>Choose your app icon</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.iconOptions}>
              {['default', 'dark', 'minimal'].map((icon) => (
                <Pressable key={icon} style={styles.iconOption}>
                  <View style={styles.iconPreview}>
                    <View style={[
                      styles.iconPreviewBg,
                      icon === 'default' && styles.iconPreviewDefault,
                      icon === 'dark' && styles.iconPreviewDark,
                      icon === 'minimal' && styles.iconPreviewMinimal,
                    ]}>
                      <Text style={styles.iconPreviewText}>💰</Text>
                    </View>
                  </View>
                  <Text style={styles.iconLabel}>{icon.charAt(0).toUpperCase() + icon.slice(1)}</Text>
                </Pressable>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Color Theme</CardTitle>
            <CardDescription>Personalize the accent color</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.colorOptions}>
              {['#10B981', '#2563EB', '#8B5CF6', '#EC4899', '#F59E0B', '#EF4444', '#06B6D4', '#22C55E'].map((color) => (
                <Pressable key={color} style={[styles.colorOption, styles.colorOptionSelected]}>
                  <View style={[styles.colorCircle, { backgroundColor: color }]} />
                </Pressable>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Display</CardTitle>
            <CardDescription>Adjust display settings</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                  <Palette size={20} color="#71717A" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Reduce Motion</Text>
                  <Text style={styles.settingSubtitle}>Minimize animations</Text>
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
                  <Monitor size={20} color="#71717A" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>High Contrast</Text>
                  <Text style={styles.settingSubtitle}>Increase color contrast</Text>
                </View>
              </View>
              <Switch
                value={false}
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
  themeOptions: { gap: 12 },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E4E4E7',
    borderRadius: 14,
  },
  themeOptionSelected: { borderColor: '#10B981', backgroundColor: '#ECFDF5' },
  themeOptionLast: { borderBottomWidth: 0 },
  themeIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  themeIconActive: { backgroundColor: '#10B981' },
  themeIconLight: { backgroundColor: '#FEF3C7' },
  themeIconDark: { backgroundColor: '#EDE9FE' },
  themeIconSystem: { backgroundColor: '#F1F5F9' },
  themeInfo: { flex: 1, marginLeft: 12 },
  themeTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  themeTitleActive: { color: '#10B981' },
  themeSubtitle: { fontSize: 13, color: '#71717A', marginTop: 2 },
  themeSubtitleActive: { color: '#059669' },
  iconOptions: { flexDirection: 'row', gap: 16 },
  iconOption: { alignItems: 'center', gap: 8, width: 80 },
  iconPreview: { width: 72, height: 72, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  iconPreviewBg: { width: 60, height: 60, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  iconPreviewDefault: { backgroundColor: '#10B981' },
  iconPreviewDark: { backgroundColor: '#1F2937' },
  iconPreviewMinimal: { backgroundColor: '#F8FAFC', borderWidth: 2, borderColor: '#E4E4E7' },
  iconPreviewText: { fontSize: 28 },
  iconLabel: { fontSize: 12, fontWeight: '500', color: '#71717A', textAlign: 'center' },
  colorOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  colorOption: { width: 44, height: 44, borderRadius: 22, borderWidth: 3, borderColor: 'transparent' },
  colorOptionSelected: { borderColor: '#10B981' },
  colorCircle: { width: 32, height: 32, borderRadius: 16, margin: 6 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
  divider: { height: 1, backgroundColor: '#E4E4E7', marginHorizontal: -16 },
  settingInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  iconContainer: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  settingTitle: { fontSize: 16, fontWeight: '600', color: '#09090B' },
  settingSubtitle: { fontSize: 13, color: '#71717A', marginTop: 2 },
});