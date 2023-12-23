import axios from 'axios';
import {AppProvider} from '../app/appProvider';
import {Methods} from './method';
import {checkAccessTokens} from '~/utils';
import {apiUrl} from './paths';
import {APIResponse} from '~/types';
import {LoginResponse} from '~/types/auth';
import {store} from '~/app/store';
import {SetIsAuthorized} from '~/redux/reducers/authSlice';

export const request = async <T extends {}>(
  url: string,
  method: string,
  params: any,
  upFile?: boolean,
): Promise<APIResponse<T>> => {
  let header: any = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  };
  if (upFile) {
    header = {
      Accept: '*/*',
      'Content-Type': 'multipart/form-data',
    };
  }

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

  const Logout = async () => {
    store.dispatch(SetIsAuthorized(false));
    await AppProvider.setTokenUser('', '');
  };

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
          const {isAccessTokenValid, isRefreshTokenValid} =
            await checkAccessTokens();
          if (isRefreshTokenValid && !isAccessTokenValid) {
            const configRefreshToken = {
              headers: header,
              method: Methods.post,
              url: apiUrl.refreshToken(),
              params: null,
              data: {
                refreshToken: refreshToken,
              },
            };
            console.log('Calling API: ', configRefreshToken.url);
            axios(configRefreshToken).then(async res => {
              if (res.status === 201) {
                await AppProvider.setTokenUser(
                  res.data.access_token,
                  res.data.refresh_token,
                );
                resolve(await request<T>(url, method, params));
              }
            });
          } else {
            Logout();
          }
        } else
          resolve({
            status: err.response.status,
            data: err.response.data,
          });
        return;
      });
  });
};
