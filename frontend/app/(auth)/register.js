import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
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
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <View className="mb-8 items-center">
        <Text className="text-3xl font-bold text-gray-900 mb-2">Create Account</Text>
        <Text className="text-gray-500">Sign up to get started</Text>
      </View>

      <View className="space-y-4">
        {/* Name Input */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 border border-gray-200">
          <User color="#9CA3AF" size={20} className="mr-2" />
          <TextInput
            className="flex-1 text-gray-900 text-base ml-2"
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email Input */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 border border-gray-200 mt-4">
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
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-lg">Create Account</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600 font-medium">Already have an account? </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text className="text-black font-bold">Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
