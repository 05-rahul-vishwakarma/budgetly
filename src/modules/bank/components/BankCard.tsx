import { View, Text, Pressable, ViewStyle, StyleSheet, Image } from 'react-native';
import { BankAccount } from '@/shared/types';
import { formatCurrency, maskAccountNumber } from '@/shared/utils';
import { banks } from '@/shared/constants/colors';
import { CheckCircle, AlertCircle, RefreshCw, MoreHorizontal } from 'lucide-react-native';

interface BankCardProps {
  account: BankAccount;
  onPress?: () => void;
  onMorePress?: () => void;
  variant?: 'default' | 'compact' | 'list';
  style?: ViewStyle;
  showBalance?: boolean;
}

export const BankCard = ({
  account,
  onPress,
  onMorePress,
  variant = 'default',
  style,
  showBalance = true,
}: BankCardProps) => {
  const bank = banks.find(b => b.id === account.bankId) || banks[0];
  const isActive = account.isActive;
  
  const getStatusConfig = () => {
    if (!isActive) return { label: 'Disconnected', icon: AlertCircle, color: '#EF4444' };
    if (account.lastSyncedAt) {
      const hoursSinceSync = (Date.now() - new Date(account.lastSyncedAt).getTime()) / 3600000;
      if (hoursSinceSync > 24) return { label: 'Sync needed', icon: RefreshCw, color: '#F59E0B' };
    }
    return { label: 'Connected', icon: CheckCircle, color: '#22C55E' };
  };

  const status = getStatusConfig();

  if (variant === 'list') {
    return (
      <Pressable
        onPress={onPress}
        style={[styles.listContainer, style]}
        android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
      >
        <View style={[styles.bankAvatar, { backgroundColor: `${bank.color}20` }]}>
          <Text style={[styles.bankInitial, { color: bank.color }]}>
            {bank.name.charAt(0)}
          </Text>
        </View>
        <View style={styles.listInfo}>
          <View style={styles.listHeader}>
            <Text style={styles.bankName}>{bank.name}</Text>
            <View style={styles.statusRow}>
              <status.icon size={12} color={status.color} />
              <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
            </View>
          </View>
          <View style={styles.listMeta}>
            <Text style={styles.metaText}>{account.accountType}</Text>
            <Text style={styles.metaDivider}>•</Text>
            <Text style={[styles.metaText, styles.fontMono]}>{maskAccountNumber(account.accountNumber)}</Text>
          </View>
        </View>
        {showBalance && (
          <Text style={styles.balanceText}>{formatCurrency(account.balance)}</Text>
        )}
        {onMorePress && (
          <Pressable onPress={onMorePress} style={styles.moreButton}>
            <MoreHorizontal size={20} color="#71717A" />
          </Pressable>
        )}
      </Pressable>
    );
  }

  if (variant === 'compact') {
    return (
      <Pressable
        onPress={onPress}
        style={[styles.compactContainer, style]}
        android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
      >
        <View style={styles.compactHeader}>
          <View style={[styles.compactAvatar, { backgroundColor: `${bank.color}20` }]}>
            <Text style={[styles.compactInitial, { color: bank.color }]}>{bank.name.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.compactBankName}>{bank.name}</Text>
            <Text style={styles.compactAccount}>{maskAccountNumber(account.accountNumber)}</Text>
          </View>
          <View style={styles.compactStatus}>
            <status.icon size={12} color={status.color} />
            <Text style={[styles.compactStatusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>
        {showBalance && (
          <View style={styles.compactBalance}>
            <Text style={styles.compactBalanceAmount}>{formatCurrency(account.balance)}</Text>
            <Text style={styles.compactAccountType}>{account.accountType}</Text>
          </View>
        )}
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
          <View style={[styles.defaultAvatar, { backgroundColor: `${bank.color}15` }]}>
            <Text style={[styles.defaultInitial, { color: bank.color }]}>{bank.name.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.defaultBankName}>{bank.name}</Text>
            <Text style={styles.defaultAccountType}>{account.accountType}</Text>
          </View>
        </View>
        <View style={styles.defaultStatusRow}>
          <View style={[styles.defaultStatusBadge, { backgroundColor: `${status.color}15` }]}>
            <status.icon size={12} color={status.color} />
            <Text style={[styles.defaultStatusText, { color: status.color }]}>{status.label}</Text>
          </View>
          {onMorePress && (
            <Pressable onPress={onMorePress} style={styles.moreButton}>
              <MoreHorizontal size={20} color="#71717A" />
            </Pressable>
          )}
        </View>
      </View>

      {showBalance && (
        <View style={styles.defaultBalance}>
          <Text style={styles.defaultBalanceLabel}>Current Balance</Text>
          <Text style={styles.defaultBalanceAmount}>{formatCurrency(account.balance)}</Text>
        </View>
      )}

      <View style={styles.defaultFooter}>
        <View style={styles.defaultFooterItem}>
          <Text style={styles.defaultFooterLabel}>Account</Text>
          <Text style={[styles.defaultFooterValue, styles.fontMono]}>{maskAccountNumber(account.accountNumber)}</Text>
        </View>
        {account.ifsc && (
          <View style={styles.defaultFooterItem}>
            <Text style={styles.defaultFooterLabel}>IFSC</Text>
            <Text style={[styles.defaultFooterValue, styles.fontMono]}>{account.ifsc}</Text>
          </View>
        )}
        {account.lastSyncedAt && (
          <View style={styles.defaultFooterItem}>
            <RefreshCw size={14} color="#71717A" />
            <Text style={styles.defaultFooterValue}>Synced {formatRelativeTime(account.lastSyncedAt)}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  bankAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankInitial: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listInfo: {
    flex: 1,
    minWidth: 0,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  bankName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#09090B',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  listMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 13,
    color: '#71717A',
  },
  metaDivider: {
    fontSize: 13,
    color: '#E4E4E7',
  },
  fontMono: {
    fontFamily: 'monospace',
  },
  balanceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#09090B',
    marginLeft: 8,
  },
  moreButton: {
    padding: 4,
  },
  compactContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  compactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  compactAvatar: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactInitial: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  compactBankName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#09090B',
    marginBottom: 2,
  },
  compactAccount: {
    fontSize: 12,
    color: '#71717A',
    fontFamily: 'monospace',
  },
  compactStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactStatusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  compactBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  compactBalanceAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#09090B',
  },
  compactAccountType: {
    fontSize: 12,
    color: '#71717A',
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
  defaultAvatar: {
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultInitial: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  defaultBankName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#09090B',
  },
  defaultAccountType: {
    fontSize: 13,
    color: '#71717A',
  },
  defaultStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  defaultStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  defaultStatusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  defaultBalance: {
    marginBottom: 12,
  },
  defaultBalanceLabel: {
    fontSize: 12,
    color: '#71717A',
    fontWeight: '500',
    marginBottom: 4,
  },
  defaultBalanceAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#09090B',
  },
  defaultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E4E4E7',
  },
  defaultFooterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  defaultFooterLabel: {
    fontSize: 12,
    color: '#71717A',
  },
  defaultFooterValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#52525B',
  },
});

import { formatRelativeTime } from '@/shared/utils';
