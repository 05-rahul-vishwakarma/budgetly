import { View, Text, Pressable, ViewStyle, StyleSheet } from 'react-native';
import { BudgetWithProgress } from '@/types';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatCurrency, getCategoryColor } from '@/utils';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react-native';

interface BudgetCardProps {
  budget: BudgetWithProgress;
  onPress?: () => void;
  variant?: 'default' | 'compact';
  style?: ViewStyle;
}

export const BudgetCard = ({
  budget,
  onPress,
  variant = 'default',
  style,
}: BudgetCardProps) => {
  const { progress, isOverBudget, daysRemaining, remaining, categoryName } = budget;
  const color = getCategoryColor(budget.categoryId);
  
  const getStatus = () => {
    if (isOverBudget) return { label: 'Over budget', icon: AlertCircle, color: '#EF4444' };
    if (progress >= 80) return { label: 'Near limit', icon: Clock, color: '#F59E0B' };
    return { label: 'On track', icon: CheckCircle, color: '#22C55E' };
  };

  const status = getStatus();

  if (variant === 'compact') {
    return (
      <Pressable
        onPress={onPress}
        style={[styles.compactContainer, style]}
        android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
      >
        <View style={styles.compactHeader}>
          <View style={styles.compactMain}>
            <View style={[styles.compactIcon, { backgroundColor: `${color}20` }]}>
              <Text style={styles.compactIconText}>💰</Text>
            </View>
            <View>
              <Text style={styles.compactName}>{categoryName}</Text>
              <Text style={styles.compactPeriod}>Monthly budget</Text>
            </View>
          </View>
          <View style={styles.compactAmounts}>
            <Text style={styles.compactSpent}>{formatCurrency(budget.spent)}</Text>
            <Text style={styles.compactDivider}>/</Text>
            <Text style={styles.compactTotal}>{formatCurrency(budget.amount)}</Text>
          </View>
        </View>
        <ProgressBar
          progress={Math.min(progress, 100)}
          height={6}
          color={status.color}
          rounded
          style={{ width: '100%', marginTop: 12 }}
        />
        <View style={styles.compactFooter}>
          <View style={styles.compactDays}>
            <Clock size={12} color="#71717A" />
            <Text style={styles.compactDaysText}>{daysRemaining} days left</Text>
          </View>
          <View style={styles.compactActions}>
            <View style={[styles.compactStatusDot, { backgroundColor: status.color }]} />
            <Text style={[styles.compactStatusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.defaultContainer, style]}
      android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
    >
      <View style={styles.defaultHeader}>
        <View style={styles.defaultMain}>
          <View style={[styles.defaultIcon, { backgroundColor: `${color}20` }]}>
            <Text style={styles.defaultIconText}>💰</Text>
          </View>
          <View>
            <Text style={styles.defaultName}>{categoryName}</Text>
            <Text style={styles.defaultPeriod}>Monthly budget</Text>
          </View>
        </View>
        <View style={styles.defaultAmounts}>
          <Text style={styles.defaultSpent}>{formatCurrency(budget.spent)}</Text>
          <Text style={styles.defaultDivider}>/</Text>
          <Text style={styles.defaultTotal}>{formatCurrency(budget.amount)}</Text>
        </View>
      </View>
      
      <ProgressBar
        progress={Math.min(progress, 100)}
        height={8}
        color={status.color}
        rounded
        style={{ width: '100%', marginTop: 12 }}
      />
      
      <View style={styles.defaultFooter}>
        <View style={styles.defaultStatus}>
          <View style={[styles.defaultStatusDot, { backgroundColor: status.color }]} />
          <Text style={[styles.defaultStatusLabel, { color: status.color }]}>{status.label}</Text>
        </View>
        <View style={styles.defaultDetails}>
          <View style={styles.defaultDays}>
            <Clock size={14} color="#71717A" />
            <Text style={styles.defaultDaysText}>{daysRemaining} days</Text>
          </View>
          <View style={styles.defaultRemaining}>
            <Text style={[styles.defaultRemainingText, isOverBudget ? { color: '#EF4444' } : { color: '#22C55E' }]}>
              {isOverBudget ? 'Over' : 'Remain'}: {formatCurrency(Math.abs(remaining))}
            </Text>
          </View>
        </View>
      </View>
      
      {budget.alertThreshold && progress >= budget.alertThreshold && !isOverBudget && (
        <View style={styles.alertBanner}>
          <AlertCircle size={16} color="#F59E0B" />
          <Text style={styles.alertText}>
            Alert: You've reached {budget.alertThreshold}% of your budget
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  compactContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  compactMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compactIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactIconText: {
    fontSize: 14,
  },
  compactName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#09090B',
  },
  compactPeriod: {
    fontSize: 12,
    color: '#71717A',
  },
  compactAmounts: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  compactSpent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#09090B',
  },
  compactDivider: {
    fontSize: 14,
    color: '#71717A',
  },
  compactTotal: {
    fontSize: 14,
    fontWeight: '500',
    color: '#71717A',
  },
  compactFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  compactDays: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactDaysText: {
    fontSize: 12,
    color: '#71717A',
  },
  compactActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compactStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  compactStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  defaultContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  defaultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  defaultMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  defaultIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultIconText: {
    fontSize: 20,
  },
  defaultName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#09090B',
  },
  defaultPeriod: {
    fontSize: 13,
    color: '#71717A',
  },
  defaultAmounts: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  defaultSpent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#09090B',
  },
  defaultDivider: {
    fontSize: 14,
    color: '#71717A',
  },
  defaultTotal: {
    fontSize: 14,
    fontWeight: '500',
    color: '#71717A',
  },
  defaultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  defaultStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  defaultStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  defaultStatusLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  defaultDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  defaultDays: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  defaultDaysText: {
    fontSize: 12,
    color: '#71717A',
  },
  defaultRemaining: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  defaultRemainingText: {
    fontSize: 13,
    fontWeight: '500',
  },
  alertBanner: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFFBE6',
    borderWidth: 1,
    borderColor: '#FEF08A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertText: {
    fontSize: 13,
    color: '#F59E0B',
    flex: 1,
  },
});
