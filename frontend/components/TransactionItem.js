import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, Alert, Platform, ToastAndroid, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react-native';

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
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = () => {
    router.push(`/(app)/edit/${_id}`);
  };

  const handleDelete = async () => {
    console.log('🗑️ DELETE BUTTON PRESSED - ID:', _id);
    if (!onDelete) {
      console.error('❌ onDelete callback is not defined');
      return;
    }
    try {
      console.log('📤 Calling onDelete with ID:', _id);
      const result = await onDelete(_id);
      console.log('📥 Delete result:', result);
      if (result?.success) {
        console.log('✅ Transaction deleted successfully');
      } else {
        console.error('❌ Delete failed:', result?.error);
        Alert.alert('Delete Error', result?.error || 'Failed to delete transaction. Try again.');
      }
    } catch (err) {
      console.error('❌ Delete error:', err);
      Alert.alert('Error', err.message || 'Failed to delete transaction.');
    }
  };

  const handleLongPress = async () => {
    console.log('Long press on card - ID:', _id);
    if (!onDelete) {
      console.error('❌ onDelete callback is not defined');
      return;
    }
    try {
      const result = await onDelete(_id);
      console.log('Delete result:', result);
      if (result?.success) {
        console.log('✅ Transaction deleted');
        if (Platform.OS === 'android') {
          ToastAndroid.show('Transaction deleted!', ToastAndroid.SHORT);
        }
      } else {
        Alert.alert('Delete Error', result?.error || 'Failed to delete');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to delete transaction');
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, isHovered && styles.containerHovered]}
      onLongPress={handleLongPress}
      onPress={() => !isHovered && handleEdit()}
      activeOpacity={0.75}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            style={{ color: '#90e0ef', fontSize: 13, marginTop: 3 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {note}
          </Text>
        ) : null}
        <Text style={{ color: '#90e0ef', fontSize: 12, marginTop: 4 }}>
          {format(new Date(date), 'MMM dd, yyyy')}
        </Text>
      </View>

      {/* Amount */}
      <View style={{ flex: 0.2, alignItems: 'flex-end', justifyContent: 'center', paddingRight: isHovered ? 100 : 0 }}>
        <Text style={{ color: '#FA4A4D', fontSize: 17, fontWeight: '700' }} numberOfLines={1}>
          ₹{Number(amount).toFixed(2)}
        </Text>
      </View>

      {/* Action Buttons - Appear on Hover */}
      {isHovered && (
        <View style={styles.actionButtons} pointerEvents="auto">
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              console.log('Edit button pressed');
              handleEdit();
            }}
            activeOpacity={0.7}
          >
            <Edit2 size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              console.log('🗑️ Delete button pressed');
              handleDelete();
            }}
            activeOpacity={0.7}
          >
            <Trash2 size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#0077b6',
    marginBottom: 14,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    position: 'relative',
  },
  containerHovered: {
    backgroundColor: '#00b4d8',
    elevation: 8,
    shadowOpacity: 0.8,
  },
  actionButtons: {
    position: 'absolute',
    right: 14,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  editButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#00b4d8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0099c9',
  },
  deleteButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FA4A4D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E63A3D',
  },
});
