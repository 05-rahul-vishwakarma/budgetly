import { Stack, useRouter } from 'expo-router';
import { Pressable, Platform } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

function BackButton() {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.back()}
      hitSlop={12}
      style={{ paddingHorizontal: 4, paddingVertical: 4 }}
    >
      <ChevronLeft size={26} color="#09090B" />
    </Pressable>
  );
}

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { fontSize: 17, fontWeight: '600', color: '#09090B' },
        headerBackTitleVisible: false, // no "phone" text next to the chevron
        headerLeft: ({ canGoBack }) => (canGoBack ? <BackButton /> : null),
        animation: 'fade',
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="phone" options={{ title: 'Enter Phone Number' }} />
      <Stack.Screen name="otp" options={{ title: 'Verify OTP' }} />
      <Stack.Screen name="profile" options={{ title: 'Create Profile' }} />
      <Stack.Screen name="permissions" options={{ title: 'Permissions' }} />
      <Stack.Screen name="bank-intro" options={{ title: 'Connect Your Bank' }} />
      <Stack.Screen name="bank-select" options={{ title: 'Select Bank' }} />
    </Stack>
  );
}