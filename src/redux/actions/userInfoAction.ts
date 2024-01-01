import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../../services/service/auth.service';
import {RegisterParams} from '~/types/auth';
import {UploadProfileImageParams} from '~/types/image';
import {userInfoService} from '~/services/service/userInfo.service';
import {UserInfo} from '~/types/userInfo';
import {AppProvider} from '~/app/appProvider';

export const uploadProfileImage = createAsyncThunk(
  'userInfo/uploadProfileImage',
  async (params: UploadProfileImageParams) => {
    let formData = new FormData();
    formData.append('image', {
      uri: params.uri,
      type: params.type,
      name: params.fileName,
    });
    // console.log(
    //   'Data upload image params: ',
    //   JSON.stringify(formData, null, 2),
    // );
    const res = await userInfoService.uploadProfileImage(formData);
    return {data: res};
  },
);

export const getUserInfo = createAsyncThunk(
  'userInfo/getUserInfo',
  async (params: {id: string}) => {
    // console.log('Data get user info params: ', JSON.stringify(params, null, 2));
    const res = await userInfoService.getUserInfo(params);
    return {data: res};
  },
);

export const setUserInfo = createAsyncThunk(
  'userInfo/setUserInfo',
  async (params: {
    fullname?: string;
    phone?: string;
    sex?: string;
    dob?: string;
    profile_image?: string;
  }) => {
    const account = await AppProvider.getAccountInfo();
    let param: {
      id: string;
      fullname?: string;
      phone?: string;
      sex?: string;
      dob?: string;
      profile_image?: string;
    } = {...params, id: account?.id || '0'};
    // console.log('Data set user info params: ', JSON.stringify(params, null, 2));
    const res = await userInfoService.setUserInfo(param);
    return {data: res};
  },
);
