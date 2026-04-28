import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, User } from 'lucide-react-native';

export default function Register() {
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
      await register(name, email, password);
    } catch (err) {
      Alert.alert('Registration Failed', err.response?.data?.msg || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121212] justify-center px-6">
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <View className="mb-10 items-center">
        <Text className="text-4xl font-bold text-white mb-2 tracking-tight">PayGauge</Text>
        <Text className="text-gray-500">Create an account to track expenses</Text>
      </View>

      <View className="space-y-4">
        {/* Name Input */}
        <View className="flex-row items-center bg-[#1C1C1E] rounded-xl px-4 py-4 border border-[#2A2A2D]">
          <User color="#6B7280" size={20} className="mr-2" />
          <TextInput
            className="flex-1 text-white text-base ml-2"
            placeholder="Full Name"
            placeholderTextColor="#6B7280"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email Input */}
        <View className="flex-row items-center bg-[#1C1C1E] rounded-xl px-4 py-4 border border-[#2A2A2D] mt-4">
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
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-lg">REGISTER</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-500 font-medium">Already have an account? </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text className="text-[#007AFF] font-bold">Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
