import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ExpenseContext } from '../../context/ExpenseContext';
import { DollarSign, Tag, Calendar, AlignLeft, ArrowLeft } from 'lucide-react-native';

const CATEGORIES = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Other'];

export default function AddExpense() {
  const router = useRouter();
  const { addExpense } = useContext(ExpenseContext);
  
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    
    setLoading(true);
    const res = await addExpense({
      amount: parseFloat(amount),
      category,
      note,
      date: new Date().toISOString()
    });
    setLoading(false);

    if (res.success) {
      router.back();
    } else {
      Alert.alert('Error', res.error || 'Failed to add expense');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-xl font-bold flex-1 text-center mr-6 text-gray-900">New Expense</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Amount Input */}
        <View className="items-center mb-8">
          <Text className="text-gray-500 mb-2">Amount</Text>
          <View className="flex-row items-center">
            <Text className="text-4xl font-bold text-gray-900 mr-1">$</Text>
            <TextInput
              className="text-5xl font-extrabold text-gray-900"
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              autoFocus
            />
          </View>
        </View>

        {/* Category Picker */}
        <View className="mb-6">
          <View className="flex-row items-center mb-3">
            <Tag size={18} color="#6B7280" className="mr-2" />
            <Text className="text-gray-700 font-semibold text-base">Category</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                className={`py-2 px-4 rounded-full mr-3 border ${category === cat ? 'bg-black border-black' : 'bg-white border-gray-200'}`}
              >
                <Text className={`${category === cat ? 'text-white' : 'text-gray-600'} font-medium`}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Note Input */}
        <View className="mb-8">
          <View className="flex-row items-center mb-3">
            <AlignLeft size={18} color="#6B7280" className="mr-2" />
            <Text className="text-gray-700 font-semibold text-base">Note (Optional)</Text>
          </View>
          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 border border-gray-200"
            placeholder="What was this for?"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={note}
            onChangeText={setNote}
          />
        </View>

        <TouchableOpacity
          className="bg-black rounded-xl py-4 flex-row justify-center items-center shadow-md shadow-gray-300"
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">Save Expense</Text>}
        </TouchableOpacity>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
