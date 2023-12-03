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

export type LoadingState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

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
