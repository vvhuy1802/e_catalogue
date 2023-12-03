import {
  AUTHSTACK,
  CATEGORY,
  FAVORITE,
  HOME,
  LOGIN,
  MAINSTACK,
  PROFILE,
  ROOMIDEA,
  SURVEY,
} from '~/constants/routeNames';
import {Methods} from '~/services/method';
import {apiUrl} from '~/services/paths';

export type LoadingState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export const ConfigRefreshToken = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  method: Methods.post,
  url: apiUrl.refreshToken,
  params: null,
  data: {
    refresh_token: '',
  },
};

export type APIResponse<T> = {
  status: number;
  data: T;
};

export type AuthStackParamList = {
  [AUTHSTACK]: undefined;
};
export type MainStackParamList = {
  [MAINSTACK]: undefined;
};

export type AuthenticationStackParamList = {
  [LOGIN]: undefined;
  [SURVEY]: undefined;
};

export type HomeStackParamList = {
  [HOME]: undefined;
  [PROFILE]: undefined;
  [CATEGORY]: undefined;
  [FAVORITE]: undefined;
  [ROOMIDEA]: undefined;
};
