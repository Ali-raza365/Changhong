import axios from './axios';
import preferences from '../common/preferences';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

export const login = (email, password, rememberMe = true) =>
  new Promise(async (resolve, reject) => {
    try {
      const requestBody = new FormData()
      requestBody.append('username', email)
      requestBody.append('password', password)

      // const response = await axios.post('/User/Login', requestBody);
      // const { data } = response;
      // console.log('login', 'response', data);

      setTimeout(() => {
        resolve({
          token: 'shahab'
        });
      }, 3000)
    } catch (error) {
      console.log('login', 'error', error);
      console.log('login', 'error.response', error.response);
      reject(error);
    }
  });

export const verifySession = () =>
  new Promise(async (resolve, reject) => {
    try {

      const requestBody = new FormData()
      requestBody.append('userId', 1)

      // const response = await axios.post('/User/TokenLogin', requestBody);
      // const { data } = response;
      // console.log('verifySession', 'response', data);

      setTimeout(() => {
        resolve({
          id: 1,
          name: 'shahab'
        });
      }, 3000)
    } catch (error) {
      console.log('verifySession', 'error', error);
      console.log('verifySession', 'error.response', error.response);
      reject(error);
    }
  });

  export const ipService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await fetch('https://ipapi.co/json', {
            method: "GET",
            headers: {
                "User-Agent": "PostmanRuntime/7.26.5"
            }
        })
        const json = await response.json();
        console.log('ipService', 'response', json)

        resolve(json)
    } catch (error) {
        console.log('ipService', 'error', error)
        reject(error)
    }
})
