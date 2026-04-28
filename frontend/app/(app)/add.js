import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ExpenseContext } from '../../context/ExpenseContext';
import { Tag, AlignLeft, ArrowLeft } from 'lucide-react-native';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#03045e' }}>
      <StatusBar barStyle="light-content" backgroundColor="#03045e" />
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#0077b6' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, marginLeft: -8 }}>
          <ArrowLeft size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center', marginRight: 24, color: 'white' }}>Add Transaction</Text>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 24 }} showsVerticalScrollIndicator={false}>
        {/* Amount Input */}
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <Text style={{ color: '#6B7280', marginBottom: 12, fontWeight: '500' }}>Amount</Text>
          <View style={{ backgroundColor: '#0077b6', borderRadius: 12, borderWidth: 1, borderColor: '#00b4d8', paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <Text style={{ fontSize: 36, fontWeight: '700', color: '#caf0f8', marginRight: 8 }}>₹</Text>
            <TextInput
              style={{ flex: 1, fontSize: 32, fontWeight: '700', color: '#00b4d8' }}
              placeholder="0.00"
              placeholderTextColor="#90e0ef"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              autoFocus
            />
          </View>
        </View>

        {/* Category Picker */}
        <View style={{ marginBottom: 32 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Tag size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
            <Text style={{ color: '#E5E7EB', fontWeight: '600', fontSize: 16 }}>Category</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  borderRadius: 20,
                  marginRight: 12,
                  borderWidth: 1,
                  backgroundColor: category === cat ? '#00b4d8' : '#0077b6',
                  borderColor: category === cat ? '#00b4d8' : '#03045e'
                }}
              >
                <Text style={{ color: category === cat ? '#03045e' : '#90e0ef', fontWeight: '500' }}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Note Input */}
        <View style={{ marginBottom: 40 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <AlignLeft size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
            <Text style={{ color: '#E5E7EB', fontWeight: '600', fontSize: 16 }}>Description</Text>
          </View>
          <View style={{ backgroundColor: '#0077b6', borderRadius: 12, borderWidth: 1, borderColor: '#00b4d8' }}>
            <TextInput
              style={{ paddingHorizontal: 16, paddingVertical: 16, color: '#caf0f8', fontSize: 16, outlineStyle: 'none' }}
              placeholder="Write a note (optional)"
              placeholderTextColor="#90e0ef"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              value={note}
              onChangeText={setNote}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{ backgroundColor: '#00b4d8', borderRadius: 50, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', shadowColor: '#00b4d8', shadowOpacity: 0.4, shadowRadius: 8, elevation: 8 }}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#03045e" /> : <Text style={{ color: '#03045e', fontWeight: 'bold', fontSize: 18 }}>Save Transaction</Text>}
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
