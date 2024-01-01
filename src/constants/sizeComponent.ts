import {HeightSize} from '~/theme/Size';
import {hasNotch, isIOS} from './global';

export const BOTTOM_TAB_HEIGHT = HeightSize(
  isIOS ? (hasNotch ? 120 : 100) : 100,
);
