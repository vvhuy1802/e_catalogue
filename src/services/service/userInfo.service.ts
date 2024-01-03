import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {LoginResponse, RegisterParams, RegisterResponse} from '~/types/auth';
import {UploadProfileImageParams} from '~/types/image';
import {UserInfo} from '~/types/userInfo';
import {Favorite} from '~/types/favorite';

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
  addFavorite: (params: Favorite) => {
    return request<Favorite>(apiUrl.addFavorite(), Methods.post, params);
  },
  removeFavorite: (params: {id: string}) => {
    return request<Favorite>(apiUrl.removeFavorite(), Methods.delete, params);
  },
  createNewCollection: (params: {name: string; image: FormData}) => {
    console.log('params create board: ', JSON.stringify(params, null, 2));
    return request<Favorite>(
      apiUrl.createNewCollection(),
      Methods.post,
      params,
      true,
    );
  },
  updateCollection: (params: {id: string}) => {
    return request<Favorite>(apiUrl.updateCollection(), Methods.put, params);
  },
  removeCollection: (params: {id: string}) => {
    return request<Favorite>(apiUrl.removeCollection(), Methods.delete, params);
  },
  getAllCollection: () => {
    return request<Favorite>(apiUrl.getAllCollection(), Methods.get, '');
  },
};
