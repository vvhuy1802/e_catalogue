import axios from 'axios';
import {AppProvider} from '../app/appProvider';
import {Methods} from './method';
import {checkAccessTokens} from '~/utils';
import {apiUrl} from './paths';
import {APIResponse, ConfigRefreshToken} from '~/types';

export const request = async <T extends {}>(
  url: string,
  method: string,
  params: any,
): Promise<APIResponse<T>> => {
  let header: any = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  };

  const token = await AppProvider.getTokenUser();
  const accessToken = token?.access_token;
  const refreshToken = token?.refresh_token;
  if (accessToken !== null) {
    header = {
      ...header,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  const config = {
    headers: header,
    method: method,
    url: url,
    params: null,
    data: undefined,
  };

  if (method.toLowerCase() === Methods.get) {
    config.params = params;
  } else {
    config.data = params ? params : undefined;
  }

  return new Promise(resolve => {
    console.log('Calling API: ', config.url);
    axios<APIResponse<T>>(config)
      .then(res => {
        resolve({
          status: res.status,
          data: res.data as unknown as T,
        });
      })
      .catch(async err => {
        if (err.response.status === 401) {
          // const {isAccessTokenValid, isRefreshTokenValid} =
          //   await checkAccessTokens();
          // if (isRefreshTokenValid && !isAccessTokenValid) {
          //   let configRefreshToken = ConfigRefreshToken;
          //   configRefreshToken.data = {
          //     refresh_token: refreshToken,
          //   };
          //   axios(configRefreshToken).then(async res => {

          //   });
          // }
          console.log('err.response.status', err.response.status);
        } else
          resolve({
            status: err.response.status,
            data: err.response.data,
          });
        return;
      });
  });
};
