import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StatusBar } from 'react-native';
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
    <SafeAreaView className="flex-1 bg-[#121212] justify-center px-6">
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <View className="mb-10 items-center">
        <Text className="text-4xl font-bold text-white mb-2 tracking-tight">PayGauge</Text>
        <Text className="text-gray-500">Sign in to your account</Text>
      </View>

      <View className="space-y-4">
        {/* Email Input */}
        <View className="flex-row items-center bg-[#1C1C1E] rounded-xl px-4 py-4 border border-[#2A2A2D]">
          <Mail color="#6B7280" size={20} className="mr-2" />
          <TextInput
            className="flex-1 text-white text-base ml-2"
            placeholder="Email Address"
            placeholderTextColor="#6B7280"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center bg-[#1C1C1E] rounded-xl px-4 py-4 border border-[#2A2A2D] mt-4">
          <Lock color="#6B7280" size={20} className="mr-2" />
          <TextInput
            className="flex-1 text-white text-base ml-2"
            placeholder="Password"
            placeholderTextColor="#6B7280"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <TouchableOpacity 
        className="bg-[#007AFF] rounded-full py-4 mt-10 flex-row justify-center items-center shadow-lg"
        style={{ shadowColor: '#007AFF', elevation: 4 }}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-lg">LOG IN</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-500 font-medium">Don't have an account? </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text className="text-[#007AFF] font-bold">Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
