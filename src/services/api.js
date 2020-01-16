import axios from 'axios';

import { AsyncStorage } from 'react-native';


const api = axios.create({
 baseURL: 'http://192.168.15.30:3333',
});

api.interceptors.request.use(async (config) => {
    try {
   
      const token = await AsyncStorage.getItem('@token_key');
   
   
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   
    } catch (err) {
   
      alert(err);
   
    }
   });

export default api;