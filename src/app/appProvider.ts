import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORE_KEYS} from '../constants/storeKeys';
import {
  LoginParams,
  LoginResponse,
  NormalizedLocationVietNam,
  RegisterResponse,
} from '~/types/auth';
import {Contact, addressTree} from '~/types/contact';

let _isShowOnBoard: boolean = false;
let _token: LoginResponse | null = null;
let _dataLogin: LoginParams | null = null;
let _historySearch: string[] = [];
let _locationVietNam: NormalizedLocationVietNam | null = null;
let _dataAccount: RegisterResponse | null = null;
let _currentContact: Contact | null = null;

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

  static setHistorySearch = async (historySearch: string) => {
    try {
      const historySearchOld = await this.getHistorySearch();
      if (historySearchOld.length >= 5) {
        historySearchOld.shift();
      }
      historySearchOld.push(historySearch);
      AsyncStorage.setItem(
        STORE_KEYS.HISTORY_SEARCH,
        JSON.stringify(historySearchOld),
      );
    } catch (error) {}
  };

  static getHistorySearch = async () => {
    if (!_historySearch) {
      try {
        const historySearch = await AsyncStorage.getItem(
          STORE_KEYS.HISTORY_SEARCH,
        );
        _historySearch = historySearch ? JSON.parse(historySearch) : [];
      } catch (error) {}
    }
    return _historySearch;
  };

  static setLocationVietNam = async (
    locationVietNam: NormalizedLocationVietNam,
  ) => {
    try {
      AsyncStorage.setItem(
        STORE_KEYS.LOCATION_VIETNAM,
        JSON.stringify(locationVietNam),
      );
      _locationVietNam = locationVietNam;
    } catch (error) {}
  };

  static getLocationVietNam = async () => {
    if (!_locationVietNam) {
      try {
        const locationVietNam = await AsyncStorage.getItem(
          STORE_KEYS.LOCATION_VIETNAM,
        );
        _locationVietNam = locationVietNam ? JSON.parse(locationVietNam) : null;
      } catch (error) {}
    }
    return _locationVietNam;
  };

  // static getLocationUSer = async (
  //   city: string,
  //   province: string,
  //   district: string,
  // ) => {
  //   if (!_locationVietNam) {
  //     try {
  //       const locationVietNam = await AsyncStorage.getItem(
  //         STORE_KEYS.LOCATION_VIETNAM,
  //       );
  //       _locationVietNam = locationVietNam ? JSON.parse(locationVietNam) : null;

  //       return {
  //         city: _locationVietNam?.entities[city],
  //         province: _locationVietNam?.entities[city].districts[district],

  //       }

  //     } catch (error) {}
  //   }
  // }

  static setAccountInfo = async (dataAccount: RegisterResponse) => {
    try {
      AsyncStorage.setItem(
        STORE_KEYS.ACCOUNT_INFO,
        JSON.stringify(dataAccount),
      );
      _dataAccount = dataAccount;
    } catch (error) {}
  };

  static getAccountInfo = async () => {
    if (!_dataAccount) {
      try {
        const dataAccount = await AsyncStorage.getItem(STORE_KEYS.ACCOUNT_INFO);
        _dataAccount = dataAccount ? JSON.parse(dataAccount) : null;
      } catch (error) {}
    }
    return _dataAccount;
  };

  static setCurrentContact = async (currentContact: Contact) => {
    try {
      console.log('currentContact', currentContact);
      AsyncStorage.setItem(
        STORE_KEYS.CURRENT_ADDRESS,
        JSON.stringify(currentContact),
      );
      _currentContact = currentContact;
    } catch (error) {}
  };

  static getCurrentContact = async () => {
    if (!_currentContact) {
      try {
        const currentContact = await AsyncStorage.getItem(
          STORE_KEYS.CURRENT_ADDRESS,
        );
        _currentContact = currentContact ? JSON.parse(currentContact) : null;
      } catch (error) {}
    }
    return _currentContact;
  };
}

export {AppProvider};
