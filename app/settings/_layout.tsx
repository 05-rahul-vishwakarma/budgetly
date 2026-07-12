import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Platform } from 'react-native';

export default function SettingsLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { fontSize: 17, fontWeight: '600' },
        // Kill the "(tabs)" text next to the back chevron
        headerBackTitleVisible: false,
        headerBackTitle: '', // iOS-safe fallback for older RN Screens versions
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <Pressable
              onPress={() => router.back()}
              hitSlop={12}
              style={{ paddingHorizontal: 4 }}
            >
              <Ionicons
                name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
                size={24}
                color="#111"
              />
            </Pressable>
          ) : null,
      }}
    >
      <Stack.Screen name="categories" options={{ title: 'Categories' }} />
      <Stack.Screen name="security" options={{ title: 'Security' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Stack.Screen name="appearance" options={{ title: 'Appearance' }} />
      <Stack.Screen name="banks" options={{ title: 'Connected Banks' }} />
      <Stack.Screen name="budgets" options={{ title: 'Budgets' }} />
      <Stack.Screen name="privacy" options={{ title: 'Privacy Policy' }} />
      <Stack.Screen name="terms" options={{ title: 'Terms of Service' }} />
      <Stack.Screen name="data" options={{ title: 'Data & Storage' }} />
      <Stack.Screen name="help" options={{ title: 'Help Center' }} />
      <Stack.Screen name="contact" options={{ title: 'Contact Us' }} />
      <Stack.Screen name="feedback" options={{ title: 'Send Feedback' }} />
      <Stack.Screen name="delete-account" options={{ title: 'Delete Account' }} />
    </Stack>
  );
}