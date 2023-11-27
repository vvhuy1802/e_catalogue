import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORE_KEYS} from '../constants/storeKeys';

let _isShowOnBoard: boolean = false;

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
}

export {AppProvider};
