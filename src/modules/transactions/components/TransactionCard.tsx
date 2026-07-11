import { View, Text, Pressable, ViewStyle, StyleSheet } from 'react-native';
import { Transaction } from '@/shared/types';
import { formatCurrency, formatRelativeTime, getCategoryColor, categories } from '@/shared/utils';

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: () => void;
  onLongPress?: () => void;
  variant?: 'default' | 'compact' | 'list';
  showAccount?: boolean;
  showCategory?: boolean;
  style?: ViewStyle;
}

const getCategoryIcon = (catId: string) => {
  const icons: Record<string, string> = {
    food: '🍔', shopping: '🛍️', transport: '🚌', bills: '📄',
    entertainment: '🎮', healthcare: '🏥', education: '📚',
    investment: '📈', income: '💰', others: '📦',
  };
  return icons[catId] || '📦';
};

export const TransactionCard = ({
  transaction,
  onPress,
  onLongPress,
  variant = 'default',
  showAccount = false,
  showCategory = true,
  style,
}: TransactionCardProps) => {
  const { amount, type, category, merchant, description, date, status } = transaction;
  const categoryData = categories.find(c => c.id === category);
  const color = getCategoryColor(category);
  const isCredit = type === 'credit';
  const amountColor = isCredit ? '#22C55E' : '#EF4444';
  const amountPrefix = isCredit ? '+' : '-';

  if (variant === 'compact') {
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={[styles.compactContainer, style]}
        android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
      >
        <View style={[styles.compactIcon, { backgroundColor: `${color}20` }]}>
          <Text style={styles.compactIconText}>{getCategoryIcon(category)}</Text>
        </View>
        <View style={styles.compactInfo}>
          <View style={styles.compactRow}>
            <Text style={styles.compactTitle}>{merchant || description}</Text>
            <Text style={[styles.compactAmount, { color: amountColor }]}>
              {amountPrefix}{formatCurrency(amount)}
            </Text>
          </View>
          <View style={styles.compactMeta}>
            <Text style={styles.compactTime}>{formatRelativeTime(date)}</Text>
            {showCategory && categoryData && (
              <>
                <Text style={styles.compactDot}>•</Text>
                <Text style={[styles.compactCategory, { color }]}>{categoryData.name}</Text>
              </>
            )}
            {status !== 'completed' && (
              <>
                <Text style={styles.compactDot}>•</Text>
                <Text style={styles.compactStatus}>{status}</Text>
              </>
            )}
          </View>
        </View>
      </Pressable>
    );
  }

  if (variant === 'list') {
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={[styles.listContainer, style]}
        android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
      >
        <View style={[styles.listIcon, { backgroundColor: `${color}20` }]}>
          <Text style={styles.listIconText}>{getCategoryIcon(category)}</Text>
        </View>
        <View style={styles.listInfo}>
          <View style={styles.listRow}>
            <Text style={styles.listTitle}>{merchant || description}</Text>
            <Text style={[styles.listAmount, { color: amountColor }]}>
              {amountPrefix}{formatCurrency(amount)}
            </Text>
          </View>
          <View style={styles.listMeta}>
            <Text style={styles.listTime}>{formatRelativeTime(date)}</Text>
            {showCategory && categoryData && (
              <>
                <Text style={styles.listDot}>•</Text>
                <Text style={[styles.listCategory, { color }]}>{categoryData.name}</Text>
              </>
            )}
            {status !== 'completed' && (
              <>
                <Text style={styles.listDot}>•</Text>
                <Text style={styles.listStatus}>{status}</Text>
              </>
            )}
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.defaultContainer, style]}
      android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
    >
      <View style={styles.defaultRow}>
        <View style={[styles.defaultIcon, { backgroundColor: `${color}20` }]}>
          <Text style={styles.defaultIconText}>{getCategoryIcon(category)}</Text>
        </View>
        <View style={styles.defaultContent}>
          <View style={styles.defaultHeader}>
            <Text style={styles.defaultTitle}>{merchant || description}</Text>
            <Text style={[styles.defaultAmount, { color: amountColor }]}>
              {amountPrefix}{formatCurrency(amount)}
            </Text>
          </View>
          <View style={styles.defaultMeta}>
            <Text style={styles.defaultTime}>{formatRelativeTime(date)}</Text>
            {showCategory && categoryData && (
              <>
                <Text style={styles.defaultDot}>•</Text>
                <Text style={[styles.defaultCategory, { color }]}>{categoryData.name}</Text>
              </>
            )}
            {status !== 'completed' && (
              <>
                <Text style={styles.defaultDot}>•</Text>
                <Text style={styles.defaultStatus}>{status}</Text>
              </>
            )}
          </View>
          {showAccount && transaction.accountId && (
            <Text style={styles.defaultAccount}>Account: {transaction.accountId.slice(-4)}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  compactIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactIconText: {
    fontSize: 20,
  },
  compactInfo: {
    flex: 1,
    minWidth: 0,
  },
  compactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  compactTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#09090B',
  },
  compactAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  compactMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compactTime: {
    fontSize: 12,
    color: '#71717A',
  },
  compactDot: {
    fontSize: 12,
    color: '#E4E4E7',
  },
  compactCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  compactStatus: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F59E0B',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listIconText: {
    fontSize: 20,
  },
  listInfo: {
    flex: 1,
    minWidth: 0,
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#09090B',
  },
  listAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  listMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listTime: {
    fontSize: 12,
    color: '#71717A',
  },
  listDot: {
    fontSize: 12,
    color: '#E4E4E7',
  },
  listCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  listStatus: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F59E0B',
  },
  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  defaultRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
    minWidth: 0,
  },
  defaultIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultIconText: {
    fontSize: 24,
  },
  defaultContent: {
    flex: 1,
    minWidth: 0,
  },
  defaultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  defaultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#09090B',
  },
  defaultAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  defaultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  defaultTime: {
    fontSize: 13,
    color: '#71717A',
  },
  defaultDot: {
    fontSize: 13,
    color: '#E4E4E7',
  },
  defaultCategory: {
    fontSize: 13,
    fontWeight: '500',
  },
  defaultStatus: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F59E0B',
  },
  defaultAccount: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 4,
  },
});
