import { Stack } from 'expo-router';
import { Providers } from '@/providers/providers';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { SplashScreen } from '@/components/ui/SplashScreen';
import { useEffect } from 'react';

function RootLayoutContent() {
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen 
          name="(auth)" 
          options={{ 
            headerShown: false,
          }} 
        />
      ) : (
        <>
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="settings" 
            options={{ 
              headerShown: false,
              presentation: 'modal',
            }} 
          />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Providers>
      <RootLayoutContent />
    </Providers>
  );
}
