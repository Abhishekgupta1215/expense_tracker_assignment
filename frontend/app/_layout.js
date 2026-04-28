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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#03045e' }}>
        <ActivityIndicator size="large" color="#00b4d8" />
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
