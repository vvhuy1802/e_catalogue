import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {register} from '../actions/authAction';
import {LoadingState, Normalized} from '~/types';
import {RegisterResponse} from '~/types/auth';
import {UserInfo} from '~/types/userInfo';
import {
  getAllCollection,
  getUserInfo,
  setUserInfo,
  uploadProfileImage,
} from '../actions/userInfoAction';
import {CollectionResponse} from '~/types/favorite';

interface UserInfoState {
  userInfo: UserInfo;
  loadingUserInfo: LoadingState;
  loadingProfileImage: LoadingState;
  allCollection: Array<CollectionResponse>;
  allItem: Array<{
    id: string;
    contentId: string;
    contentType: string;
  }>;
  allIdea: Array<{
    id: string;
    contentId: string;
    contentType: string;
  }>;
}

const initialState = {
  userInfo: {},
  loadingUserInfo: 'idle',
  loadingProfileImage: 'idle',
  allCollection: [],
  allItem: [],
  allIdea: [],
} as unknown as UserInfoState;

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
      console.log('Data get user info: ', JSON.stringify(action.payload.data));
      if (action.payload.data.status === 200) {
        const resData: UserInfo = action.payload.data
          .data as unknown as UserInfo;
        state.userInfo = resData;
      }
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loadingUserInfo = 'rejected';
    });
    builder.addCase(setUserInfo.pending, (state, action) => {
      state.loadingUserInfo = 'pending';
    });
    builder.addCase(setUserInfo.fulfilled, (state, action) => {
      state.loadingUserInfo = 'fulfilled';
      console.log('Data get user info: ', JSON.stringify(action.payload.data));
      const resData: UserInfo = action.payload.data.data as unknown as UserInfo;
      state.userInfo = resData;
    });
    builder.addCase(setUserInfo.rejected, (state, action) => {
      state.loadingUserInfo = 'rejected';
    });
    builder.addCase(getAllCollection.fulfilled, (state, action) => {
      console.log(
        'Data get all colection: ',
        JSON.stringify(action.payload.data.data),
      );
      if (action.payload.data.status === 200) {
        const resData: Array<CollectionResponse> = action.payload.data
          .data as unknown as Array<CollectionResponse>;
        state.allCollection = resData;
        let items: Array<{
          id: string;
          contentId: string;
          contentType: string;
        }> = [];
        let ideas: Array<{
          id: string;
          contentId: string;
          contentType: string;
        }> = [];
        resData.forEach(collection => {
          if (collection.favorites.length != 0) {
            collection.favorites.forEach(item => {
              if (item.contentType == 'product') {
                items.push(item);
              } else {
                ideas.push(item);
              }
            });
          }
        });
        state.allItem = items;
        state.allIdea = ideas;
      }
    });
  },
});

export default userInfoSlice.reducer;
export const selectLoadingUserInfoState = (state: RootState) =>
  state.userInfo.loadingUserInfo;
export const selectLoadingProfileImageState = (state: RootState) =>
  state.userInfo.loadingProfileImage;
export const selectUserInfo = (state: RootState) => state.userInfo.userInfo;
export const selectAllCollection = (state: RootState) =>
  state.userInfo.allCollection;
export const selectAllItem = (state: RootState) => state.userInfo.allItem;
export const selectAllIdea = (state: RootState) => state.userInfo.allIdea;
