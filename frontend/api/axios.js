import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use localhost for web, 10.0.2.2 for Android emulator, localhost for iOS simulator
const getBaseURL = () => {
  // For web/browser
  if (typeof window !== 'undefined') {
    return 'http://localhost:5000/api';
  }
  // For Android emulator
  return 'http://10.0.2.2:5000/api';
};

const instance = axios.create({
  baseURL: getBaseURL(),
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
