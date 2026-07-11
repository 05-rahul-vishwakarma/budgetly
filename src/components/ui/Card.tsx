import { View, ViewProps, Pressable, PressableProps, StyleSheet, Text } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onPress?: () => void;
}

export const Card = ({
  className,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  onPress,
  children,
  style,
  ...props
}: CardProps) => {
  const Component = onPress ? Pressable : View;
  const pressProps = onPress
    ? {
        onPress,
        activeOpacity: hoverable ? 0.9 : 1,
      }
    : {};

  return (
    <Component
      style={[
        styles.base,
        styles[variant],
        styles[padding],
        hoverable && styles.hoverable,
        style,
      ]}
      {...pressProps}
      {...props}
    >
      {children}
    </Component>
  );
}

interface CardPressableProps extends PressableProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onPress: () => void;
}

export const CardPressable = ({
  variant = 'default',
  padding = 'md',
  children,
  onPress,
  style,
  ...props
}: CardPressableProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        styles[variant],
        styles[padding],
        style,
      ]}
      android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
      {...props}
    >
      {children}
    </Pressable>
  );
};

export const CardHeader = ({ children, ...props }: ViewProps) => (
  <View style={styles.header} {...props}>{children}</View>
);

export const CardTitle = ({ children, ...props }: ViewProps) => (
  <Text style={styles.title} {...props}>{children}</Text>
);

export const CardDescription = ({ children, ...props }: ViewProps) => (
  <Text style={styles.description} {...props}>{children}</Text>
);

export const CardContent = ({ children, ...props }: ViewProps) => (
  <View style={styles.content} {...props}>{children}</View>
);

export const CardFooter = ({ children, ...props }: ViewProps) => (
  <View style={styles.footer} {...props}>{children}</View>
);

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
  },
  default: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E4E4E7',
  },
  elevated: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  none: {},
  sm: { padding: 12 },
  md: { padding: 16 },
  lg: { padding: 24 },
  hoverable: {
    // handled by Pressable activeOpacity
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#09090B',
  },
  description: {
    fontSize: 14,
    color: '#71717A',
    marginTop: 4,
  },
  content: {},
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E4E4E7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
});
