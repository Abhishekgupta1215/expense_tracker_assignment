import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, User } from 'lucide-react-native';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await register(name, email, password);
      console.log('Registration successful:', response);
      // Navigate to dashboard after successful registration
      setTimeout(() => {
        router.replace('/(app)/dashboard');
      }, 500);
    } catch (err) {
      console.log('Registration error:', err);
      setLoading(false);
      const errorMsg = err?.response?.data?.msg || err?.message || 'An error occurred';
      Alert.alert('Registration Failed', errorMsg);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#03045e', justifyContent: 'center', paddingHorizontal: 24 }}>
      <StatusBar barStyle="light-content" backgroundColor="#03045e" />
      <View style={{ marginBottom: 40, alignItems: 'center' }}>
        <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#caf0f8', marginBottom: 8, letterSpacing: -0.5 }}>PayGauge</Text>
        <Text style={{ color: '#90e0ef', fontSize: 16 }}>Create an account to track expenses</Text>
      </View>

      <View style={{ gap: 16 }}>
        {/* Name Input */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#0077b6', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, borderWidth: 1, borderColor: '#00b4d8' }}>
          <User color="#90e0ef" size={20} style={{ marginRight: 8 }} />
          <TextInput
            style={{ flex: 1, color: '#caf0f8', fontSize: 16, marginLeft: 8, outlineStyle: 'none' }}
            placeholder="Full Name"
            placeholderTextColor="#90e0ef"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email Input */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#0077b6', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, borderWidth: 1, borderColor: '#00b4d8', marginTop: 16 }}>
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
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#03045e" />
        ) : (
          <Text style={{ color: '#03045e', fontWeight: 'bold', fontSize: 18 }}>REGISTER</Text>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
        <Text style={{ color: '#90e0ef', fontWeight: '500' }}>Already have an account? </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={{ color: '#00b4d8', fontWeight: 'bold' }}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
