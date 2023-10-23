import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORE_KEYS} from '../constants/storeKeys';

let _auth: any = null;

class AppProvider {
  static setAuth(token = null) {
    try {
      if (token) {
        AsyncStorage.setItem(STORE_KEYS.TOKEN, token);
        _auth = {authToken: token};
      } else {
        AsyncStorage.removeItem(STORE_KEYS.TOKEN);
        _auth = null;
      }
    } catch (error) {}
  }

  static getAuth = async () => {
    if (!_auth) {
      try {
        const token = await AsyncStorage.getItem(STORE_KEYS.TOKEN);
        _auth = token ? {authToken: token} : null;
      } catch (error) {}
    }
    return _auth;
  };
}

export {AppProvider};
