import { View, Text, ViewProps, StyleSheet, ViewStyle } from 'react-native';

interface ProgressBarProps extends ViewProps {
  progress: number;
  height?: number;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | string;
  backgroundColor?: ViewStyle;
  rounded?: boolean;
  animated?: boolean;
  showLabel?: boolean;
  label?: string;
  className?: string;
  style?: ViewStyle;
}

const colorMap: Record<string, string> = {
  primary: '#10B981',
  secondary: '#2563EB',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
};

export const ProgressBar = ({
  progress,
  height = 6,
  color = 'primary',
  backgroundColor,
  rounded = true,
  animated = true,
  showLabel = false,
  label,
  className,
  style,
  ...props
}: ProgressBarProps) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const fillColor = colorMap[color] || color;

  return (
    <View style={[styles.container, style]} {...props}>
      {(showLabel || label) && (
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>{label || `${Math.round(clampedProgress)}%`}</Text>
          <Text style={styles.labelValue}>{Math.round(clampedProgress)}%</Text>
        </View>
      )}
      <View
        style={[
          styles.track,
          rounded && styles.rounded,
          { height },
          backgroundColor || styles.defaultTrack,
        ]}
      >
        <View
          style={[
            styles.fill,
            rounded && styles.fillRounded,
            { width: `${clampedProgress}%`, backgroundColor: fillColor },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  labelText: {
    fontSize: 12,
    color: '#71717A',
  },
  labelValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52525B',
  },
  track: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  rounded: {
    borderRadius: 9999,
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  fillRounded: {
    borderRadius: 9999,
  },
  defaultTrack: {
    backgroundColor: '#E4E4E7',
  },
});
