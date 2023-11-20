import {
  AUTHSTACK,
  HOME,
  LOGIN,
  MAINSTACK,
  SURVEY,
} from '~/constants/routeNames';

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
};
