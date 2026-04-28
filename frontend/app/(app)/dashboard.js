import React, { useContext, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  RefreshControl, StatusBar, Image, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExpenseContext } from '../../context/ExpenseContext';
import { AuthContext } from '../../context/AuthContext';
import { Plus, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import TransactionItem from '../../components/TransactionItem';

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

  const handleDelete = async (id) => {
    await deleteExpense(id);
  };

  const totalExpense = Object.values(summary).reduce((acc, curr) => acc + curr, 0);

  const NoResults = () => (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}>
      <LottieView
        style={{ width: 160, height: 160 }}
        source={require('../../assets/no-items.json')}
        autoPlay
        loop
      />
      <Text style={{ color: '#6B7280', textAlign: 'center', marginTop: 12, fontSize: 15 }}>
        No transactions yet.{'\n'}Tap + to add your first expense.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          Home
        </Text>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <LogOut size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
        <TouchableOpacity activeOpacity={0.9} style={{ elevation: 8 }}>
          <LinearGradient
            style={styles.card}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['#0082c8', '#007AFF', '#007AFF', '#0082c8']}
          >
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <View>
                <Image
                  style={{ height: 50, width: 50 }}
                  source={require('../../assets/images/chip_1.png')}
                />
              </View>
              <View style={{ paddingBottom: 8 }}>
                <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginBottom: 4, letterSpacing: 1.5, fontWeight: '600' }}>
                  MY BALANCE
                </Text>
                <Text style={{ fontSize: 30, fontWeight: '700', color: 'white' }}>
                  ₹{Number(totalExpense || 0).toFixed(2)}
                </Text>
                {/* Category breakdown pills */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, gap: 6 }}>
                  {Object.entries(summary).map(([cat, amt]) => (
                    <View key={cat} style={styles.pill}>
                      <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11 }}>
                        {cat}: ₹{Number(amt).toFixed(0)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions label */}
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <Text style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)' }}>Recent Transactions</Text>
      </View>

      {error ? (
        <Text style={{ color: '#FA4A4D', textAlign: 'center', marginBottom: 10 }}>{error}</Text>
      ) : null}

      {/* Transaction List */}
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {loading && !refreshing ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <LottieView
              style={{ width: 100, height: 100 }}
              source={require('../../assets/loading.json')}
              autoPlay
              loop
            />
          </View>
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <TransactionItem item={item} onDelete={handleDelete} />
            )}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007AFF" />
            }
            contentContainerStyle={{ paddingBottom: 110, minHeight: 2 }}
            ListEmptyComponent={NoResults}
          />
        )}
      </View>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => router.push('/(app)/add')}
      >
        <Plus size={26} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
    flex: 1,
    paddingRight: 12,
  },
  logoutBtn: {
    padding: 8,
    backgroundColor: '#1C1C1E',
    borderRadius: 50,
  },
  card: {
    height: 190,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 22,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 63,
    height: 63,
    position: 'absolute',
    bottom: 36,
    right: 24,
    backgroundColor: '#007AFF',
    borderRadius: 100,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
});
