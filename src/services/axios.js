import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Preferences from '../common/preferences';

export const BASE_URL = 'https://selloutapp.chiq.com.pk';
const instance = Axios.create({
    baseURL: BASE_URL + '/api',
    timeout: 30000,
});

instance.interceptors.request.use(
    async (config) => {
        const data = await AsyncStorage.getItem(Preferences.KEYS.ACCESS_TOKEN);

        if (data) {
            let t = JSON.parse(data)
            console.log({ type: t.type }, "axios instance ")
            config.headers.Authorization = 'Bearer ' + t.token;
        }
        // config.headers.Accept = 'application/json';
        // config.headers['X-DeviceId'] = 'ReactNative';
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

instance.interceptors.response.use(
    async (response) => {
        // if(response?.data){
        //     console.log('axios-response', response.status, response.data)
        // }

        return response;
    },
    (err) => {
        return Promise.reject(err);
    },
);

export default instance;
