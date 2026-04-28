import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your local machine's IP address if testing on a physical device
// For Android emulator, use 10.0.2.2
const instance = axios.create({
  baseURL: 'http://10.0.2.2:5000/api', // Use localhost for iOS simulator, 10.0.2.2 for Android emulator
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default instance;
