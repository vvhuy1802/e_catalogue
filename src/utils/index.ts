import {AppProvider} from '~/app/appProvider';
import jwt_decode from 'jwt-decode';
import {LoginParams} from '~/types/auth';
import {ImageSourcePropType, ImageURISource} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {createContext} from 'react';
import {CartResponse} from '~/types/order';
import {ContactAddress} from '~/types/contact';

type decodedToken = {
  exp: number;
};

export const checkAccessTokens = async () => {
  let response = {
    message: '',
    isAccessTokenValid: false,
    isRefreshTokenValid: false,
  };

  try {
    const data = await AppProvider.getTokenUser();
    if (data) {
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;

      const decodedAccessToken: decodedToken = jwt_decode(accessToken);
      const decodedRefreshToken: decodedToken = jwt_decode(refreshToken);

      const currentTime = Date.now() / 1000;
      response.isAccessTokenValid =
        decodedAccessToken.exp > currentTime ? true : false;
      response.isRefreshTokenValid =
        decodedRefreshToken.exp > currentTime ? true : false;
      response.message = response.isAccessTokenValid
        ? 'Access token is valid'
        : 'Access token is expired';
    }
  } catch (err) {}
  return response;
};

export const getUrl = (image: string) => {
  const imageUri: ImageSourcePropType = {
    uri: `https://e-catalogue.abcdavid.top/file-server/get/${image}`,
  };
  return imageUri;
};

export const checkRole = (role: string) => {
  console.log('role', role);
  switch (role) {
    case 'customer':
      return 'CUSTOMER';
    case 'shop_owner':
      return 'STORE';
    case 'admin':
      return 'ADMIN';
    default:
      return 'CUSTOMER';
  }
};

export const countTotalItemInCart = (dataCart: CartResponse) => {
  let totalItem = 0;
  dataCart?.stores?.ids.forEach(storeId => {
    totalItem += dataCart.stores.entities[storeId].items.ids.length;
  });
  return totalItem;
};

export const getAddressFromServer = async (address: ContactAddress) => {
  const location = await AppProvider.getLocationVietNam();

  return {
    province: location?.entities[address.province].name,
    district:
      location?.entities[address.province].districts.entities[address.district]
        .name,
    ward: location?.entities[address.province].districts.entities[
      address.district
    ].wards.entities[address.ward].name,
    details: address.details,
  };
};

export const formatDate = (date: string) => {
  const dateArr = date.split('/');
  const month = dateArr[1];
  const day = dateArr[0];
  const year = dateArr[2];

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  return `${months[month - 1]} ${day}, ${year}`;
};
