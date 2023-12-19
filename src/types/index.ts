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
} from '~/constants/routeNames';

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
  [PROFILE]: undefined;
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
    categoryId?: string;
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
