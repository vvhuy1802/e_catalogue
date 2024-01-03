import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {HeightSize} from '~/theme/size';

export const isIOS = Platform.OS === 'ios';

export const hasNotch = DeviceInfo.hasNotch();

export const BOTTOM_TAB_HEIGHT = HeightSize(
  isIOS ? (hasNotch ? 120 : 100) : 100,
);

export const URL_GET_FILE = 'https://e-catalogue.abcdavid.top/file-server/get/';
