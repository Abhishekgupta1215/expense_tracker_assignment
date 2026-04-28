import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ title: 'Dashboard', headerShown: false }} />
      <Stack.Screen name="add" options={{ title: 'Add Expense', presentation: 'modal' }} />
      <Stack.Screen name="edit/[id]" options={{ title: 'Edit Expense', presentation: 'modal' }} />
    </Stack>
  );
}
