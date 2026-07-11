import { View, Text, Pressable, ViewStyle, StyleSheet } from 'react-native';
import { Category } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatCurrency, getCategoryColor } from '@/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';

interface CategoryCardProps {
  category: Category & { 
    spent?: number; 
    budget?: number; 
    transactionCount?: number;
    trend?: 'up' | 'down' | 'stable';
  };
  onPress?: () => void;
  showProgress?: boolean;
  style?: ViewStyle;
}

const categoryIcons: Record<string, string> = {
  food: '🍔', shopping: '🛍️', transport: '🚌', bills: '📄',
  entertainment: '🎮', healthcare: '🏥', education: '📚',
  investment: '📈', income: '💰', others: '📦',
};

const getCategoryIcon = (categoryId: string) => {
  return categoryIcons[categoryId] || categoryIcons.others;
};

export const CategoryCard = ({
  category,
  onPress,
  showProgress = true,
  style,
}: CategoryCardProps) => {
  const color = category.color || getCategoryColor(category.id);
  const spent = category.spent || 0;
  const budget = category.budget || 0;
  const progress = budget > 0 ? (spent / budget) * 100 : 0;
  const isOverBudget = spent > budget && budget > 0;
  const trend = category.trend || 'stable';

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, style]}
      android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
    >
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <View style={[styles.iconBg, { backgroundColor: `${color}20` }]}>
            <Text style={styles.iconText}>{getCategoryIcon(category.id)}</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{category.name}</Text>
              <Badge variant={category.type === 'income' ? 'income' : 'expense'} size="sm">
                {category.type}
              </Badge>
            </View>
            {category.transactionCount !== undefined && (
              <Text style={styles.transactionCount}>
                {category.transactionCount} transactions
              </Text>
            )}
          </View>
        </View>
        <View style={styles.amountSection}>
          <Text style={[styles.amount, category.type === 'income' ? styles.amountIncome : styles.amountExpense]}>
            {category.type === 'income' ? '+' : '-'}{formatCurrency(spent)}
          </Text>
          {showProgress && budget > 0 && (
            <View style={styles.progressWrapper}>
              <ProgressBar
                progress={Math.min(progress, 100)}
                height={4}
                color={isOverBudget ? '#EF4444' : color}
                rounded
              />
            </View>
          )}
        </View>
      </View>
      {showProgress && budget > 0 && (
        <View style={styles.footer}>
          <Text style={styles.budgetText}>
            Budget: {formatCurrency(budget)}
          </Text>
          <View style={styles.trendRow}>
            {trend === 'up' && <TrendingUp size={14} color="#EF4444" />}
            {trend === 'down' && <TrendingDown size={14} color="#22C55E" />}
            {trend === 'stable' && <Minus size={14} color="#71717A" />}
            <Text style={[styles.trendText, isOverBudget ? styles.trendOver : styles.trendNormal]}>
              {isOverBudget ? 'Over budget' : `${Math.round(progress)}% used`}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 0,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#09090B',
  },
  transactionCount: {
    fontSize: 13,
    color: '#71717A',
  },
  amountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 80,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  amountIncome: {
    color: '#22C55E',
  },
  amountExpense: {
    color: '#EF4444',
  },
  progressWrapper: {
    width: '100%',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E4E4E7',
  },
  budgetText: {
    fontSize: 13,
    color: '#71717A',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 13,
    fontWeight: '500',
  },
  trendOver: {
    color: '#EF4444',
  },
  trendNormal: {
    color: '#22C55E',
  },
});
