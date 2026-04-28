import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExpenseContext } from '../../context/ExpenseContext';
import { AuthContext } from '../../context/AuthContext';
import { Plus, LogOut, FileText } from 'lucide-react-native';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Dashboard() {
  const { expenses, summary, loading, error, fetchExpenses } = useContext(ExpenseContext);
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
      className="bg-[#1C1C1E] p-4 rounded-xl mb-3 flex-row justify-between items-center"
      onPress={() => router.push(`/(app)/edit/${item._id}`)}
      activeOpacity={0.7}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      <View className="flex-row items-center flex-1">
        <View className="bg-[#2A2A2D] p-3 rounded-full mr-4">
          <FileText size={20} color="#007AFF" />
        </View>
        <View className="flex-1 mr-2">
          <Text className="text-white font-semibold text-lg mb-1" numberOfLines={1}>{item.category}</Text>
          <Text className="text-gray-400 text-sm">{format(new Date(item.date), 'MMM dd, yyyy')}</Text>
          {item.note ? <Text className="text-gray-500 text-xs mt-1" numberOfLines={1}>{item.note}</Text> : null}
        </View>
      </View>
      <Text className="text-[#FA4A4D] font-bold text-lg">₹{item.amount.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      {/* Header */}
      <View className="px-5 pt-2 pb-5 flex-row justify-between items-center">
        <Text className="text-white text-3xl font-bold" numberOfLines={1} ellipsizeMode="tail">
          Home
        </Text>
        <TouchableOpacity onPress={logout} className="p-2 bg-[#1C1C1E] rounded-full">
          <LogOut size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Summary Card */}
      <View className="px-5 mb-6 shadow-xl">
        <TouchableOpacity activeOpacity={0.9} style={{ elevation: 8 }}>
          <LinearGradient
            style={{ padding: 24, borderRadius: 16, minHeight: 160, justifyContent: 'space-between' }}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['#0082c8', '#007AFF']}
          >
            <View className="flex-1 justify-between">
              <View className="bg-white/20 w-12 h-8 rounded mb-6" /> {/* Chip mock */}
              <View>
                <Text className="text-white/80 text-xs font-semibold tracking-widest mb-1">
                  MY BALANCE
                </Text>
                <Text className="text-white text-4xl font-extrabold tracking-tight">
                  ₹{Number(totalExpense || 0).toFixed(2)}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Expense List */}
      <View className="flex-1 px-5">
        <Text className="text-lg text-white mb-4">Recent Transactions</Text>
        {error ? (
          <Text className="text-[#FA4A4D] text-center mb-4">{error}</Text>
        ) : null}
        
        {loading && !refreshing ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={item => item._id}
            renderItem={renderExpenseItem}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007AFF" />}
            contentContainerStyle={{ paddingBottom: 100, minHeight: 2 }}
            ListEmptyComponent={() => (
              <View className="items-center justify-center mt-10">
                <Text className="text-gray-400 text-center text-lg">No transactions yet.</Text>
                <Text className="text-gray-500 text-center text-sm">Tap + to add your first expense.</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-10 right-7 bg-[#007AFF] w-16 h-16 rounded-full justify-center items-center"
        style={{
          shadowColor: '#FFF',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 6,
        }}
        activeOpacity={0.8}
        onPress={() => router.push('/(app)/add')}
      >
        <Plus size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
