import { View, ViewProps, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface BadgeProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary' | 'income' | 'expense';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles: Record<string, ViewStyle & { color: string }> = {
  default: { backgroundColor: '#F4F4F5', color: '#3F3F46' },
  success: { backgroundColor: '#DCFCE7', color: '#166534' },
  warning: { backgroundColor: '#FEF9C3', color: '#854D0E' },
  error: { backgroundColor: '#FEF2F2', color: '#991B1B' },
  info: { backgroundColor: '#DBEAFE', color: '#1E40AF' },
  primary: { backgroundColor: '#ECFDF5', color: '#065F46' },
  income: { backgroundColor: '#DCFCE7', color: '#166534' },
  expense: { backgroundColor: '#FEF2F2', color: '#991B1B' },
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
