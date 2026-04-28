import React, { useState, useContext } from 'react';
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
    console.log('Delete button clicked for expense:', id);
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this specific transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            console.log('Delete confirmed for expense:', id);
            setLoading(true);
            try {
              const res = await deleteExpense(id);
              console.log('Delete response:', res);
              if (res.success) {
                Alert.alert('Success', 'Transaction deleted successfully');
                setTimeout(() => {
                  router.back();
                }, 800);
              } else {
                setLoading(false);
                Alert.alert('Error', res.error || 'Failed to delete expense');
              }
            } catch (err) {
              setLoading(false);
              console.error('Delete error caught:', err);
              Alert.alert('Error', 'Failed to delete expense. Please try again.');
            }
          }
        }
      ]
    );
  };

  if (!expense) {
    console.log('Expense not found. ID:', id, 'Available expenses:', expenses.map(e => e._id));
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1C1C1E' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, marginLeft: -8 }}>
            <ArrowLeft size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center', marginRight: 24, color: 'white' }}>Edit Transaction</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
          <Text style={{ color: '#caf0f8', fontSize: 16, textAlign: 'center' }}>Transaction not found</Text>
          <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20, paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#00b4d8', borderRadius: 8 }}>
            <Text style={{ color: '#03045e', fontWeight: 'bold' }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#03045e' }}>
      <StatusBar barStyle="light-content" backgroundColor="#03045e" />
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#0077b6', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, marginLeft: -8 }}>
          <ArrowLeft size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Edit Transaction</Text>
        <TouchableOpacity onPress={handleDelete} disabled={loading} style={{ padding: 8, marginRight: -8, backgroundColor: '#FA4A4D15', borderRadius: 50, opacity: loading ? 0.5 : 1 }}>
          {loading ? <ActivityIndicator color="#FA4A4D" /> : <Trash2 size={20} color="#FA4A4D" />}
        </TouchableOpacity>
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
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#03045e" /> : <Text style={{ color: '#03045e', fontWeight: 'bold', fontSize: 18 }}>Update Transaction</Text>}
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
