'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useColorScheme, ColorSchemeName } from 'react-native';
import { colors as baseColors } from '@/constants/colors';

type ThemeMode = 'light' | 'dark';

interface ResolvedColors {
  primary: typeof baseColors.primary;
  secondary: typeof baseColors.secondary;
  teal: string;
  success: string;
  error: string;
  warning: string;
  white: string;
  black: string;
  emerald: typeof baseColors.emerald;
  slate: typeof baseColors.slate;
  amber: typeof baseColors.amber;
  purple: typeof baseColors.purple;
  indigo: typeof baseColors.indigo;
  cyan: typeof baseColors.cyan;
  pink: typeof baseColors.pink;
  background: string;
  card: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
    muted2: string;
  };
  border: string;
  status: {
    disabled: string;
  };
}

interface ThemeContextType {
  mode: ThemeMode;
  colors: ResolvedColors;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const mode = systemColorScheme === 'dark' ? 'dark' : 'light';

  const resolvedColors = useMemo((): ResolvedColors => ({
    ...baseColors,
    background: baseColors.background[mode],
    card: baseColors.card[mode],
    text: {
      primary: baseColors.text.primary[mode],
      secondary: baseColors.text.secondary[mode],
      muted: baseColors.text.muted[mode],
      muted2: baseColors.text.muted2,
    },
    border: baseColors.border[mode],
    status: baseColors.status,
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, colors: resolvedColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}