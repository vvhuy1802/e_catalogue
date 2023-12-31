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
  HOME_SCREEN_ADMIN_STORE,
  ORDER_SCREEN_ADMIN_STORE,
  PRODUCT_SCREEN_ADMIN_STORE,
  ADMIN_STORE_STACK,
  STYLE_ROOM_SCREEN_ADMIN_STORE,
  ADD_STYLE_ROOM_SCREEN_ADMIN_STORE,
  DETAIL_STYLE_ROOM_SCREEN_ADMIN_STORE,
  STYLE_ROOM_STACK_PARAMS_LIST,
  DETAIL_ORDER_SCREEN_ADMIN_STORE,
  ORDER_STACK_ADMIN_STORE_PARAMS_LIST,
} from '~/constants/routeNames';
import {ProductCategoryResponse} from './product';
import {ImagePickerResponse} from 'react-native-image-picker';
import {CartVariant, NormalizeCartVariant, OrderAdminStore} from './order';
import {ContactAddress} from './contact';

export type LoadingState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export type Normalized<T, B> = {
  //normalize data
  ids: T[];
  entities: {
    [key: string]: B;
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

export type AdminStoreStackScreen = {
  [ADMIN_STORE_STACK]: undefined;
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
  [MYBAG]: {
    isShowBottomBarWhenBack?: boolean;
  };
  [CONFIRMORDER]: {
    dataOrder?: NormalizeCartVariant;
  };
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

export type AdminStoreStackParamList = {
  [HOME_SCREEN_ADMIN_STORE]: undefined;
  [PRODUCT_SCREEN_ADMIN_STORE]: undefined;
  [ORDER_STACK_ADMIN_STORE_PARAMS_LIST]: undefined;
  [STYLE_ROOM_STACK_PARAMS_LIST]: NavigatorScreenParams<StyleRoomStackParamList>;
};

export type StyleRoomStackParamList = {
  [STYLE_ROOM_SCREEN_ADMIN_STORE]: undefined;
  [ADD_STYLE_ROOM_SCREEN_ADMIN_STORE]: {
    imageAdding: ImagePickerResponse;
    widthImgage: number;
    heightImage: number;
  };
  [DETAIL_STYLE_ROOM_SCREEN_ADMIN_STORE]: undefined;
};

export type OrderStackAdminStoreParamList = {
  [ORDER_SCREEN_ADMIN_STORE]: undefined;
  [DETAIL_ORDER_SCREEN_ADMIN_STORE]: {
    order: OrderAdminStore;
  };
};
