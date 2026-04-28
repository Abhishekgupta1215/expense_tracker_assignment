import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock } from 'lucide-react-native';

export default function Login() {
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
      await login(email, password);
    } catch (err) {
      Alert.alert('Login Failed', err.response?.data?.msg || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <View className="mb-8 items-center">
        <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</Text>
        <Text className="text-gray-500">Sign in to continue tracking expenses</Text>
      </View>

      <View className="space-y-4">
        {/* Email Input */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 border border-gray-200">
          <Mail color="#9CA3AF" size={20} className="mr-2" />
          <TextInput
            className="flex-1 text-gray-900 text-base ml-2"
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 mt-4">
          <Lock color="#9CA3AF" size={20} className="mr-2" />
          <TextInput
            className="flex-1 text-gray-900 text-base ml-2"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <TouchableOpacity 
        className="bg-black rounded-xl py-4 mt-8 flex-row justify-center items-center"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-lg">Sign In</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600 font-medium">Don't have an account? </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text className="text-black font-bold">Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
