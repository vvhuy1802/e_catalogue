import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {LoginResponse, RegisterParams, RegisterResponse} from '~/types/auth';
import {UploadProfileImageParams} from '~/types/image';
import {UserInfo} from '~/types/userInfo';

export const userInfoService = {
  uploadProfileImage: (params: FormData) => {
    return request<UserInfo>(apiUrl.profileImage(), Methods.post, params, true);
  },
  getUserInfo: (params: {id: string}) => {
    return request<UserInfo>(apiUrl.getUserInfo(), Methods.get, params);
  },
  setUserInfo: (params: UserInfo | undefined) => {
    return request<UserInfo>(apiUrl.setUserInfo(), Methods.post, params);
  },
  followStore: (params: {storeId: number; follow: boolean}) => {
    return request<
      Array<{
        storeId: number;
        userId: number;
      }>
    >(apiUrl.followStore(), Methods.post, params);
  },
};
