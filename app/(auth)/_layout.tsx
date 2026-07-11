import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackVisible: true,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="phone" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="permissions" />
      <Stack.Screen name="bank-intro" />
      <Stack.Screen name="bank-select" />
    </Stack>
  );
}
