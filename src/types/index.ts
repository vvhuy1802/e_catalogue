import {NavigatorScreenParams} from '@react-navigation/native';
import {ImageSourcePropType} from 'react-native';
import {
  AUTHSTACK,
  CATEGORY,
  FAVORITE,
  HOME,
  LOGIN,
  MAINSTACK,
  PROFILE,
  STYLEIDEA,
  SEARCHSTACK,
  SEARCHSCREEN,
  SURVEY,
  DETAILSEARCHSCREEN,
  CATEGORYSCREEN,
  DETAILCATEGORYSCREEN,
  PRODUCTDETAILSCREEN,
  PRODUCTSTACK,
  REVIEWDETAIL,
  MYBAG,
  ORDERSTACK,
  CONFIRMORDER,
  EDITADDRESS,
  ADDADDRESS,
  STYLEDETAIL,
  STYLEIDEASTACK,
  ALLIMAGE,
  ACCOUNT_DETAIL,
  ADDRESS_BOOK,
  MY_PURCHASES,
  MY_WALLET,
  PROFILE_STACK,
} from '~/constants/routeNames';
import {ProductCategoryResponse} from './product';

export type LoadingState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export type Normalized<T, B> = {
  //normalize data
  ids: T[];
  entities: {
    [key: number]: B;
  };
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
  [PROFILE_STACK]: undefined;
  [CATEGORY]: NavigatorScreenParams<CategoryStackParamList>;
  [FAVORITE]: undefined;
  [STYLEIDEASTACK]: NavigatorScreenParams<StyleIdeaStackParamList>;
  [SEARCHSTACK]: NavigatorScreenParams<SearchStackParamList>;
  [ORDERSTACK]: NavigatorScreenParams<OrderStackParamList>;
};

export type SearchStackParamList = {
  [SEARCHSCREEN]: undefined;
  [DETAILSEARCHSCREEN]: {
    searchQuery?: string;
  };
};

export type StyleIdeaStackParamList = {
  [STYLEIDEA]: undefined;
  [STYLEDETAIL]: {
    styleId?: string;
  };
  [ALLIMAGE]: {
    arrayImages: Array<{
      id: string;
      url: ImageSourcePropType;
    }>;
  };
};

export type CategoryStackParamList = {
  [CATEGORYSCREEN]: undefined;
  [DETAILCATEGORYSCREEN]: {
    category?: ProductCategoryResponse;
  };
  [PRODUCTSTACK]: NavigatorScreenParams<ProductDetailStackParamList>;
};

export type ProductDetailStackParamList = {
  [PRODUCTDETAILSCREEN]: {
    productId?: string;
  };
  [REVIEWDETAIL]: undefined;
};

export type OrderStackParamList = {
  [MYBAG]: undefined;
  [CONFIRMORDER]: undefined;
  [EDITADDRESS]: undefined;
  [ADDADDRESS]: undefined;
};

export type ProfileStackParamList = {
  [PROFILE]: undefined;
  [ACCOUNT_DETAIL]: undefined;
  [MY_PURCHASES]: undefined;
  [ADDRESS_BOOK]: undefined;
  [MY_WALLET]: undefined;
};
