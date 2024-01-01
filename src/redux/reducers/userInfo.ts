import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {register} from '../actions/authAction';
import {LoadingState} from '~/types';
import {RegisterResponse} from '~/types/auth';
import {UserInfo} from '~/types/userInfo';
import {getUserInfo, uploadProfileImage} from '../actions/userInfoAction';

interface UserInfoState {
  userInfo: UserInfo;
  loadingUserInfo: LoadingState;
  loadingProfileImage: LoadingState;
}

const initialState = {
  userInfo: {},
  loadingUserInfo: 'idle',
  loadingProfileImage: 'idle',
} as UserInfoState;

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(uploadProfileImage.pending, (state, action) => {
      state.loadingProfileImage = 'pending';
    });
    builder.addCase(uploadProfileImage.fulfilled, (state, action) => {
      state.loadingProfileImage = 'fulfilled';
      // console.log(
      //   'Data upload profile image: ',
      //   JSON.stringify(action.payload.data),
      // );
      const resData: UserInfo = action.payload.data.data as unknown as UserInfo;
      state.userInfo.profile_image = resData.profile_image;
    });
    builder.addCase(uploadProfileImage.rejected, (state, action) => {
      state.loadingProfileImage = 'rejected';
    });

    builder.addCase(getUserInfo.pending, (state, action) => {
      state.loadingUserInfo = 'pending';
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loadingUserInfo = 'fulfilled';
      // console.log('Data get user info: ', JSON.stringify(action.payload.data));
      const resData: UserInfo = action.payload.data.data as unknown as UserInfo;
      state.userInfo = resData;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loadingUserInfo = 'rejected';
    });
  },
});

export default userInfoSlice.reducer;
export const selectLoadingUserInfoState = (state: RootState) =>
  state.userInfo.loadingUserInfo;
export const selectLoadingProfileImageState = (state: RootState) =>
  state.userInfo.loadingProfileImage;
export const selectUserInfo = (state: RootState) => state.userInfo.userInfo;
