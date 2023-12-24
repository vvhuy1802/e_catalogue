import {AppProvider} from '~/app/appProvider';
import jwt_decode from 'jwt-decode';
import {LoginParams} from '~/types/auth';
import {ImageSourcePropType, ImageURISource} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';

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
    // uri: `https://e-catalogue.abcdavid.top/file-server/get/5f58ae36-9e85-11ee-a738-a2e28baa03ba.png`,
  };
  return imageUri;
};

export const checkRole = (role: string) => {
  console.log('role', role);
  switch (role) {
    case 'customer':
      return 'CUSTOMER';
    case 'store':
      return 'STORE';
    case 'admin':
      return 'ADMIN';
    default:
      return 'CUSTOMER';
  }
};
