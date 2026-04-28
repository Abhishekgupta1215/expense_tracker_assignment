import React from 'react';
import { Image, Text, TouchableOpacity, View, Alert, Platform, ToastAndroid, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';

const CATEGORY_ICONS = {
  food: require('../assets/images/food.png'),
  transport: require('../assets/images/transportation.png'),
  entertainment: require('../assets/images/entertainment.png'),
  utilities: require('../assets/images/bills.png'),
  shopping: require('../assets/images/purchases.png'),
  other: require('../assets/images/miscellaneous.png'),
};

const getIcon = (category) => {
  const key = category?.toLowerCase();
  return CATEGORY_ICONS[key] || CATEGORY_ICONS['other'];
};

const TransactionItem = ({ item, onDelete }) => {
  const { _id, category, note, amount, date } = item;
  const router = useRouter();

  const handleLongPress = () => {
    Alert.alert(
      'Delete Transaction',
      'Do you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'YES',
          style: 'destructive',
          onPress: () => {
            onDelete?.(_id);
            if (Platform.OS === 'android') {
              ToastAndroid.show('Transaction deleted!', ToastAndroid.LONG);
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={handleLongPress}
      onPress={() => router.push(`/(app)/edit/${_id}`)}
      activeOpacity={0.75}
    >
      {/* Category Icon */}
      <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'flex-start' }}>
        <Image
          style={{ height: 44, width: 44, marginLeft: 2 }}
          source={getIcon(category)}
          defaultSource={CATEGORY_ICONS['other']}
        />
      </View>

      {/* Title & Date */}
      <View style={{ flex: 0.65, paddingHorizontal: 10, justifyContent: 'center' }}>
        <Text
          style={{ color: 'white', fontSize: 17, fontWeight: '600' }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {category}
        </Text>
        {note ? (
          <Text
            style={{ color: '#9CA3AF', fontSize: 13, marginTop: 3 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {note}
          </Text>
        ) : null}
        <Text style={{ color: '#6B7280', fontSize: 12, marginTop: 4 }}>
          {format(new Date(date), 'MMM dd, yyyy')}
        </Text>
      </View>

      {/* Amount */}
      <View style={{ flex: 0.2, alignItems: 'flex-end', justifyContent: 'center' }}>
        <Text style={{ color: '#FA4A4D', fontSize: 17, fontWeight: '700' }} numberOfLines={1}>
          ₹{Number(amount).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#1C1C1E',
    marginBottom: 14,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
});
