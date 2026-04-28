import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExpenseContext } from '../../context/ExpenseContext';
import { AuthContext } from '../../context/AuthContext';
import { Plus, LogOut, Receipt, TrendingUp } from 'lucide-react-native';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const { expenses, summary, loading, error, fetchExpenses, deleteExpense } = useContext(ExpenseContext);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchExpenses();
    setRefreshing(false);
  };

  const totalExpense = Object.values(summary).reduce((acc, curr) => acc + curr, 0);

  const renderExpenseItem = ({ item }) => (
    <TouchableOpacity
      className="bg-white p-4 rounded-2xl mb-3 flex-row justify-between items-center shadow-sm border border-gray-100"
      onPress={() => router.push(`/(app)/edit/${item._id}`)}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View className="bg-blue-50 p-3 rounded-full mr-4">
          <Receipt size={20} color="#3B82F6" />
        </View>
        <View className="flex-1 mr-2">
          <Text className="text-gray-900 font-semibold text-base mb-1" numberOfLines={1}>{item.category}</Text>
          <Text className="text-gray-500 text-xs">{format(new Date(item.date), 'MMM dd, yyyy')}</Text>
          {item.note ? <Text className="text-gray-400 text-xs mt-1" numberOfLines={1}>{item.note}</Text> : null}
        </View>
      </View>
      <Text className="text-red-500 font-bold text-lg">-${item.amount.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-4 pb-6 flex-row justify-between items-center">
        <View>
          <Text className="text-gray-500 text-sm font-medium">Welcome back,</Text>
          <Text className="text-2xl font-bold text-gray-900">{user?.name}</Text>
        </View>
        <TouchableOpacity onPress={logout} className="p-2 bg-gray-100 rounded-full">
          <LogOut size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {/* Summary Card */}
      <View className="px-6 mb-6">
        <View className="bg-black rounded-3xl p-6 shadow-md shadow-gray-400">
          <View className="flex-row justify-between items-start mb-4">
            <Text className="text-gray-400 font-medium text-base">Total Balance</Text>
            <View className="bg-gray-800 p-2 rounded-full">
              <TrendingUp size={16} color="#4ADE80" />
            </View>
          </View>
          <Text className="text-white text-4xl font-extrabold tracking-tight">
            ${totalExpense.toFixed(2)}
          </Text>
          <View className="mt-4 flex-row flex-wrap">
            {Object.entries(summary).map(([category, amount]) => (
              <View key={category} className="bg-gray-800 rounded-lg px-3 py-1 mr-2 mb-2">
                <Text className="text-gray-300 text-xs">{category}: ${amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Expense List */}
      <View className="flex-1 px-6">
        <Text className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</Text>
        {error ? (
          <Text className="text-red-500 text-center mb-4">{error}</Text>
        ) : null}
        
        {loading && !refreshing ? (
          <ActivityIndicator size="large" color="#000" className="mt-10" />
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={item => item._id}
            renderItem={renderExpenseItem}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <View className="items-center justify-center mt-10">
                <Text className="text-gray-400 text-center text-lg">No expenses found.</Text>
                <Text className="text-gray-400 text-center text-sm">Tap + to add your first expense.</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-8 right-6 bg-black w-14 h-14 rounded-full justify-center items-center shadow-md shadow-gray-400"
        activeOpacity={0.8}
        onPress={() => router.push('/(app)/add')}
      >
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
