import {Dimensions, PixelRatio} from 'react-native';
import {isIOS} from '~/constants/global';

export const {width, height} = Dimensions.get('window');

const dHeight = 896;
const dWidth = 414;

export const HeightSize = (inputNumber: number) => {
  return Math.round((height * inputNumber) / dHeight);
};

export const WidthSize = (inputNumber: number) => {
  return Math.round((width * inputNumber) / dWidth);
};

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / dWidth;

export function normalizeText(size: number) {
  const newSize = size * scale;
  if (isIOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
