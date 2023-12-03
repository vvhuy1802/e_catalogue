import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORE_KEYS} from '../constants/storeKeys';
import {LoginParams, LoginResponse} from '~/types/auth';

let _isShowOnBoard: boolean = false;
let _token: LoginResponse | null = null;
let _dataLogin: LoginParams | null = null;

class AppProvider {
  static setIsShowOnBoard = async () => {
    try {
      AsyncStorage.setItem(STORE_KEYS.IS_SHOW_ONBOARD, JSON.stringify(false));
      _isShowOnBoard = false;
    } catch (error) {}
  };

  static getIsShowOnBoard = async () => {
    if (!_isShowOnBoard) {
      try {
        const isShow = await AsyncStorage.getItem(STORE_KEYS.IS_SHOW_ONBOARD);
        _isShowOnBoard = isShow ? JSON.parse(isShow) : true;
      } catch (error) {}
    }
    return _isShowOnBoard;
  };

  static setTokenUser = async (accessToken: string, refreshToken: string) => {
    try {
      AsyncStorage.setItem(
        STORE_KEYS.TOKEN,
        JSON.stringify({
          access_token: accessToken,
          refresh_token: refreshToken,
        }),
      );
      _token = {access_token: accessToken, refresh_token: refreshToken};
    } catch (error) {}
  };

  static getTokenUser = async () => {
    if (!_token) {
      try {
        const dataUser = await AsyncStorage.getItem(STORE_KEYS.TOKEN);
        _token = dataUser ? JSON.parse(dataUser) : null;
      } catch (error) {
        console.log('err when get data user ', error);
      }
    }
    return _token;
  };

  static setDataLogin = async (dataLogin: LoginParams) => {
    try {
      AsyncStorage.setItem(STORE_KEYS.DATA_LOGIN, JSON.stringify(dataLogin));
      _dataLogin = dataLogin;
    } catch (error) {}
  };

  static getDataLogin = async () => {
    if (!_dataLogin) {
      try {
        const dataLogin = await AsyncStorage.getItem(STORE_KEYS.DATA_LOGIN);
        _dataLogin = dataLogin ? JSON.parse(dataLogin) : null;
      } catch (error) {}
    }
    return _dataLogin;
  };
}

export {AppProvider};
