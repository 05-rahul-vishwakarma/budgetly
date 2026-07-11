import { Pressable, PressableProps, View, Text, ActivityIndicator, ViewStyle, StyleSheet } from 'react-native';
import { ForwardedRef, forwardRef } from 'react';

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
}

export const Button = forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      style,
      disabled,
      onPress,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary: styles.primary,
      secondary: styles.secondary,
      outline: styles.outline,
      ghost: styles.ghost,
      danger: styles.danger,
    };

    const sizeStyles = {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
      xl: styles.xl,
    };

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          styles.base,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && styles.fullWidth,
          style,
        ]}
        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' || variant === 'ghost' ? '#10B981' : '#fff'}
          />
        ) : (
          <>
            {leftIcon && <View>{leftIcon}</View>}
            <Text style={variant === 'outline' || variant === 'ghost' ? styles.textPrimary : styles.textWhite}>
              {children}
            </Text>
            {rightIcon && <View>{rightIcon}</View>}
          </>
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    fontWeight: '600',
    gap: 88,
  },
  primary: { backgroundColor: '#10B981', shadowColor: '#10B981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  secondary: { backgroundColor: '#2563EB', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  outline: { borderWidth: 2, borderColor: '#10B981', backgroundColor: 'transparent' },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: '#EF4444', shadowColor: '#EF4444', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  sm: { paddingHorizontal: 12, paddingVertical: 8, gap: 86 },
  md: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  lg: { paddingHorizontal: 24, paddingVertical: 12, gap: 88 },
  xl: { paddingHorizontal: 32, paddingVertical: 16, gap: 810 },
  fullWidth: { width: '100%' },
  textWhite: { color: '#fff', fontSize: 16, fontWeight: '600' },
  textPrimary: { color: '#10B981', fontSize: 16, fontWeight: '600' },
});
