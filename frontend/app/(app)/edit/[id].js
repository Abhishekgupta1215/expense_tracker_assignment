import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ExpenseContext } from '../../../context/ExpenseContext';
import { Trash2, Tag, AlignLeft, ArrowLeft } from 'lucide-react-native';

const CATEGORIES = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Other'];

export default function EditExpense() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { expenses, updateExpense, deleteExpense } = useContext(ExpenseContext);
  
  const expense = expenses.find(e => e._id === id);

  const [amount, setAmount] = useState(expense ? expense.amount.toString() : '');
  const [category, setCategory] = useState(expense ? expense.category : CATEGORIES[0]);
  const [note, setNote] = useState(expense && expense.note ? expense.note : '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!expense) {
      router.back();
    }
  }, [expense]);

  const handleUpdate = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    
    setLoading(true);
    const res = await updateExpense(id, {
      amount: parseFloat(amount),
      category,
      note
    });
    setLoading(false);

    if (res.success) {
      router.back();
    } else {
      Alert.alert('Error', res.error || 'Failed to update expense');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this specific transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            const res = await deleteExpense(id);
            if (res.success) {
              router.back();
            } else {
              setLoading(false);
              Alert.alert('Error', res.error || 'Failed to delete expense');
            }
          }
        }
      ]
    );
  };

  if (!expense) return null;

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      {/* Header */}
      <View className="px-5 py-4 flex-row items-center border-b border-[#1C1C1E] justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#FFF" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">Edit Transaction</Text>
        <TouchableOpacity onPress={handleDelete} className="p-2 -mr-2 bg-[#FA4A4D]/10 rounded-full">
          <Trash2 size={20} color="#FA4A4D" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {/* Amount Input */}
        <View className="items-center mb-10">
          <Text className="text-gray-400 mb-2 font-medium">Amount</Text>
          <View className="flex-row items-center">
            <Text className="text-4xl font-bold text-white mr-1">₹</Text>
            <TextInput
              className="text-5xl font-extrabold text-[#007AFF]"
              placeholder="0.00"
              placeholderTextColor="#2A2A2D"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        {/* Category Picker */}
        <View className="mb-8">
          <View className="flex-row items-center mb-3">
            <Tag size={18} color="#9CA3AF" className="mr-2" />
            <Text className="text-gray-300 font-semibold text-base">Category</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                className={`py-2 px-5 rounded-full mr-3 border ${category === cat ? 'bg-[#007AFF] border-[#007AFF]' : 'bg-[#1C1C1E] border-[#2A2A2D]'}`}
              >
                <Text className={`${category === cat ? 'text-white' : 'text-gray-400'} font-medium`}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Note Input */}
        <View className="mb-10">
          <View className="flex-row items-center mb-3">
            <AlignLeft size={18} color="#9CA3AF" className="mr-2" />
            <Text className="text-gray-300 font-semibold text-base">Description</Text>
          </View>
          <View className="bg-[#1C1C1E] rounded-xl border border-[#2A2A2D]">
            <TextInput
              className="px-4 py-4 text-white text-base"
              placeholder="Write a note (optional)"
              placeholderTextColor="#6B7280"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              value={note}
              onChangeText={setNote}
            />
          </View>
        </View>

        <TouchableOpacity
          className="bg-[#007AFF] rounded-full py-4 flex-row justify-center items-center shadow-lg"
          style={{ shadowColor: '#007AFF', elevation: 4 }}
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">Update Transaction</Text>}
        </TouchableOpacity>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
