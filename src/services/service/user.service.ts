import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {LoginResponse, RegisterParams, RegisterResponse} from '~/types/auth';
import {UploadProfileImageParams} from '~/types/image';
import {UserInfo} from '~/types/userInfo';

export const userService = {
  checkUsername: (params: {username: string}) => {
    return request<boolean>(
      apiUrl.username_availability(),
      Methods.get,
      params,
    );
  },
  checkEmail: (params: {email: string}) => {
    return request<boolean>(apiUrl.email_availability(), Methods.get, params);
  },
};
