import AsyncStorage from '@react-native-community/async-storage';

export const KEYS = {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    LANGUAGE: 'language',
    USER_DETAILS: 'USER_DETAILS',
};

const clearAuthSession = () =>
    new Promise(async (resolve, reject) => {
        try {
            const $keys = [
                KEYS.ACCESS_TOKEN,
            ]
            await AsyncStorage.multiRemove($keys)
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });

const checkAuthSession = () =>
    new Promise(async (resolve, reject) => {
        try {
            const token = await AsyncStorage.getItem(KEYS.ACCESS_TOKEN);

            if (typeof token === 'string') {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });

const getAuthSession = () =>
    new Promise(async (resolve, reject) => {
        try {
            const authSession = {};
            const accessToken = await AsyncStorage.getItem(KEYS.ACCESS_TOKEN);
            if (typeof accessToken === 'string') {
                resolve(accessToken);
            } else {
                resolve(null);
            }
        } catch (error) {
            reject(error);
        }
    });

const setAuthSession = (authSession) =>
    new Promise(async (resolve, reject) => {
        try {
            console.log(authSession, "setAuthSession")
            await AsyncStorage.setItem(KEYS.ACCESS_TOKEN, JSON.stringify(authSession));
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });

const setUser = (authSession) =>
    new Promise(async (resolve, reject) => {
        console.log(authSession, "set user Deatails")
        try {
            await AsyncStorage.setItem(KEYS.USER_DETAILS, JSON.stringify(authSession.user));
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });

const getUser = () =>
    new Promise(async (resolve) => {
        try {
            const user = await AsyncStorage.getItem(KEYS.USER_DETAILS);
            resolve(user);
        } catch (error) {
            resolve(null);
        }
    });

const setLocalization = async (languageTag) => {
    try {
        await AsyncStorage.setItem(KEYS.LANGUAGE, languageTag);
    } catch (error) { }
};

const getLocalization = () =>
    new Promise(async (resolve) => {
        try {
            const languageTag = await AsyncStorage.getItem(KEYS.LANGUAGE);
            resolve(languageTag);
        } catch (error) {
            resolve(null);
        }
    });

export default {
    KEYS,
    clearAuthSession,
    checkAuthSession,
    setAuthSession,
    getAuthSession,
    setLocalization,
    getLocalization,
    setUser,
    getUser
};
