import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { Home, CreditCard, BarChart2, Target, Settings, Bell } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#71717A',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E4E4E7',
          height: 80,
          paddingBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 16,
          elevation: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: 'center' }}>
              <Home size={24} color={color} strokeWidth={focused ? 3 : 2} fill={focused ? color : 'none'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: 'center' }}>
              <CreditCard size={24} color={color} strokeWidth={focused ? 3 : 2} fill={focused ? color : 'none'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: 'center' }}>
              <BarChart2 size={24} color={color} strokeWidth={focused ? 3 : 2} fill={focused ? color : 'none'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: 'Budget',
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: 'center' }}>
              <Target size={24} color={color} strokeWidth={focused ? 3 : 2} fill={focused ? color : 'none'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, color }) => (
            <View style={{ alignItems: 'center' }}>
              <Settings size={24} color={color} strokeWidth={focused ? 3 : 2} fill={focused ? color : 'none'} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
