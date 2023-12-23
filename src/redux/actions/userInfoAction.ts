import {createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from '../../services/service/auth.service';
import {RegisterParams} from '~/types/auth';
import {UploadProfileImageParams} from '~/types/image';
import {userInfoService} from '~/services/service/userInfo.service';

export const uploadProfileImage = createAsyncThunk(
  'userInfo/uploadProfileImage',
  async (params: UploadProfileImageParams) => {
    let formData = new FormData();
    // const cleanURL = params.uri.replace('file://', '');
    formData.append('image', {
      uri: params.uri,
      type: params.type,
      name: params.fileName,
    });
    console.log(
      'Data upload image params: ',
      JSON.stringify(formData, null, 2),
    );
    const res = await userInfoService.uploadProfileImage(formData);

    /**
     * * Can transform data here
     */
    return {data: res};
  },
);
