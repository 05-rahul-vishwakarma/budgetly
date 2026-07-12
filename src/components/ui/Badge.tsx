import { View, ViewProps, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface BadgeProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary' | 'income' | 'expense';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles: Record<string, ViewStyle & { color: string }> = {
  default: { backgroundColor: colors.slate[100], color: colors.slate[700] },
  success: { backgroundColor: colors.emerald[100], color: colors.emerald[800] },
  warning: { backgroundColor: colors.amber[100], color: colors.amber[900] },
  error: { backgroundColor: colors.pink[50], color: colors.pink[900] },
  info: { backgroundColor: colors.secondary[100], color: colors.secondary[800] },
  primary: { backgroundColor: colors.emerald[50], color: colors.emerald[900] },
  income: { backgroundColor: colors.emerald[100], color: colors.emerald[800] },
  expense: { backgroundColor: colors.pink[50], color: colors.pink[900] },
};

const sizeStyles: Record<string, ViewStyle> = {
  sm: { paddingHorizontal: 8, paddingVertical: 2 },
  md: { paddingHorizontal: 10, paddingVertical: 4 },
  lg: { paddingHorizontal: 12, paddingVertical: 6 },
};

const textSizeStyles: Record<string, TextStyle> = {
  sm: { fontSize: 12 },
  md: { fontSize: 14 },
  lg: { fontSize: 16 },
};

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  style,
  ...props
}: BadgeProps) => {
  const variantStyle = variantStyles[variant] || variantStyles.default;
  const sizeStyle = sizeStyles[size] || sizeStyles.md;
  const textSizeStyle = textSizeStyles[size] || textSizeStyles.md;

  return (
    <View
      style={[
        styles.container,
        variantStyle,
        sizeStyle,
        style,
      ]}
      {...props}
    >
      <Text style={[styles.text, { color: variantStyle.color }, textSizeStyle]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '500',
  },
});
