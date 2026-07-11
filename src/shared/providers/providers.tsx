'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { Platform } from 'react-native';
import { useColorScheme } from 'react-native';
import { Appearance } from 'react-native';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { useUIStore } from '@/shared/stores';
import { AuthProvider } from '@/shared/hooks/useAuth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ReactQueryDevtoolsWrapper() {
  if (Platform.OS !== 'web') return null;
  
  const Devtools = require('@tanstack/react-query-devtools').ReactQueryDevtools;
  return <Devtools initialIsOpen={false} />;
}

export function Providers({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const setTheme = useUIStore((state) => state.setTheme);
  const theme = useUIStore((state) => state.theme);
  const { isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      const systemTheme = Appearance.getColorScheme();
      setTheme(theme === 'system' ? (systemTheme || 'light') : theme);
    }
  }, [colorScheme, isLoading, theme, setTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
      <ReactQueryDevtoolsWrapper />
    </QueryClientProvider>
  );
}
