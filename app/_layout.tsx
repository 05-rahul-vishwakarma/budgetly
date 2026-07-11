import { Stack } from 'expo-router';
import { Providers } from '@/providers/providers';
import { useAuthStore } from '@/features/auth/store/authStore';
import { SplashScreen } from '@/components/ui/SplashScreen';
import { useEffect } from 'react';

export default function RootLayout() {
  const { isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Providers>
      <Stack
        screenOptions={{
          headerShown: true,
          headerBackVisible: true,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {!isAuthenticated && <Stack.Screen name="splash" options={{ presentation: 'modal', headerShown: false }} />}
      </Stack>
    </Providers>
  );
}
