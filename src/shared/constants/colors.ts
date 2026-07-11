export const colors = {
  primary: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  secondary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  background: {
    light: '#F8FAFC',
    dark: '#09090B',
  },
  card: {
    light: '#FFFFFF',
    dark: '#18181B',
  },
  text: {
    primary: { light: '#09090B', dark: '#FAFAFA' },
    secondary: { light: '#52525B', dark: '#A1A1AA' },
    muted: { light: '#71717A', dark: '#71717A' },
  },
  border: { light: '#E4E4E7', dark: '#27272A' },
};

export const categories = [
  { id: 'food', name: 'Food', icon: 'Utensils', color: '#EF4444', type: 'expense' },
  { id: 'shopping', name: 'Shopping', icon: 'ShoppingBag', color: '#EC4899', type: 'expense' },
  { id: 'transport', name: 'Transport', icon: 'Car', color: '#3B82F6', type: 'expense' },
  { id: 'bills', name: 'Bills', icon: 'FileText', color: '#F59E0B', type: 'expense' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Gamepad2', color: '#8B5CF6', type: 'expense' },
  { id: 'healthcare', name: 'Healthcare', icon: 'HeartPulse', color: '#10B981', type: 'expense' },
  { id: 'education', name: 'Education', icon: 'GraduationCap', color: '#06B6D4', type: 'expense' },
  { id: 'investment', name: 'Investment', icon: 'TrendingUp', color: '#6366F1', type: 'expense' },
  { id: 'income', name: 'Income', icon: 'Wallet', color: '#22C55E', type: 'income' },
  { id: 'others', name: 'Others', icon: 'MoreHorizontal', color: '#71717A', type: 'expense' },
];

export const banks = [
  { id: 'hdfc', name: 'HDFC Bank', logo: 'hdfc', color: '#0033A0' },
  { id: 'icici', name: 'ICICI Bank', logo: 'icici', color: '#FF6600' },
  { id: 'sbi', name: 'State Bank of India', logo: 'sbi', color: '#0066CC' },
  { id: 'axis', name: 'Axis Bank', logo: 'axis', color: '#FF0000' },
  { id: 'kotak', name: 'Kotak Mahindra Bank', logo: 'kotak', color: '#E81E25' },
  { id: 'yes', name: 'YES Bank', logo: 'yes', color: '#0066CC' },
  { id: 'indusind', name: 'IndusInd Bank', logo: 'indusind', color: '#0099CC' },
  { id: 'federal', name: 'Federal Bank', logo: 'federal', color: '#0066CC' },
  { id: 'idfc', name: 'IDFC First Bank', logo: 'idfc', color: '#000000' },
  { id: 'rbl', name: 'RBL Bank', logo: 'rbl', color: '#0066CC' },
];

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
