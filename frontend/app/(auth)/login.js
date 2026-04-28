import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock } from 'lucide-react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await login(email, password);
      console.log('Login successful:', response);
      // Navigate to dashboard after successful login
      setTimeout(() => {
        router.replace('/(app)/dashboard');
      }, 500);
    } catch (err) {
      console.log('Login error:', err);
      setLoading(false);
      const errorMsg = err?.response?.data?.msg || err?.message || 'Invalid credentials';
      Alert.alert('Login Failed', errorMsg);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#03045e', justifyContent: 'center', paddingHorizontal: 24 }}>
      <StatusBar barStyle="light-content" backgroundColor="#03045e" />
      <View style={{ marginBottom: 40, alignItems: 'center' }}>
        <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#caf0f8', marginBottom: 8, letterSpacing: -0.5 }}>PayGauge</Text>
        <Text style={{ color: '#90e0ef', fontSize: 16 }}>Sign in to your account</Text>
      </View>

      <View style={{ gap: 16 }}>
        {/* Email Input */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#0077b6', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, borderWidth: 1, borderColor: '#00b4d8' }}>
          <Mail color="#90e0ef" size={20} style={{ marginRight: 8 }} />
          <TextInput
            style={{ flex: 1, color: '#caf0f8', fontSize: 16, marginLeft: 8, outlineStyle: 'none' }}
            placeholder="Email Address"
            placeholderTextColor="#90e0ef"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#0077b6', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, borderWidth: 1, borderColor: '#00b4d8', marginTop: 16 }}>
          <Lock color="#90e0ef" size={20} style={{ marginRight: 8 }} />
          <TextInput
            style={{ flex: 1, color: '#caf0f8', fontSize: 16, marginLeft: 8, outlineStyle: 'none' }}
            placeholder="Password"
            placeholderTextColor="#90e0ef"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={{ backgroundColor: '#00b4d8', borderRadius: 50, paddingVertical: 16, marginTop: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#00b4d8', shadowOpacity: 0.4, shadowRadius: 8, elevation: 8 }}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#03045e" />
        ) : (
          <Text style={{ color: '#03045e', fontWeight: 'bold', fontSize: 18 }}>LOG IN</Text>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
        <Text style={{ color: '#90e0ef', fontWeight: '500' }}>Don't have an account? </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={{ color: '#00b4d8', fontWeight: 'bold' }}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
