import { View, ViewProps, Image, Text, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface AvatarProps extends ViewProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  src?: string;
  name?: string;
  fallback?: string;
  shape?: 'circle' | 'square';
  className?: string;
}

const sizeStyles: Record<string, ViewStyle> = {
  xs: { width: 24, height: 24 },
  sm: { width: 32, height: 32 },
  md: { width: 40, height: 40 },
  lg: { width: 48, height: 48 },
  xl: { width: 64, height: 64 },
  '2xl': { width: 80, height: 80 },
};

const shapeStyles = {
  circle: { borderRadius: 9999 },
  square: { borderRadius: 8 },
};

const textSizeStyles: Record<string, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  '2xl': 32,
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getColor = (name: string) => {
  const colorArray = [
    colors.teal, colors.secondary[600], colors.success, colors.warning, colors.error,
    colors.purple[600], colors.pink[500], colors.cyan[500], colors.indigo[500], '#F97316',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colorArray[Math.abs(hash) % colorArray.length];
};

export const Avatar = ({
  size = 'md',
  src,
  name,
  fallback,
  shape = 'circle',
  style,
  ...props
}: AvatarProps) => {
  if (src) {
    return (
      <Image
        style={[styles.base, sizeStyles[size], shapeStyles[shape], style] as ImageStyle[]}
        source={{ uri: src }}
        {...props}
      />
    );
  }

  return (
    <View
      style={[
        styles.base,
        sizeStyles[size],
        shapeStyles[shape],
        { backgroundColor: getColor(name || fallback || '?') },
        style,
      ]}
      {...props}
    >
      <Text style={[styles.initials, { fontSize: textSizeStyles[size] }]}>
        {name ? getInitials(name) : fallback || '?'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontWeight: '600',
    color: '#fff',
  },
});
