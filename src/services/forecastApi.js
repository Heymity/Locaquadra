import axios from 'axios';

//import { AsyncStorage } from 'react-native';

const forecastApi = axios.create({
 baseURL: 'https://api.openweathermap.org/data/2.5',
});

export default forecastApi;