import React, { useContext, useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { ExpenseProvider } from '../context/ExpenseContext';
import { View, ActivityIndicator } from 'react-native';

const InitialLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Redirect to login
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Redirect to main app
      router.replace('/(app)/dashboard');
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <InitialLayout />
      </ExpenseProvider>
    </AuthProvider>
  );
}
