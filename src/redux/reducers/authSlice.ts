import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {
  getUserById,
  register,
  setNewEmail,
  setNewUsername,
} from '../actions/authAction';
import {LoadingState} from '~/types';
import {RegisterResponse} from '~/types/auth';
import {AppProvider} from '~/app/appProvider';

enum Role {
  'ADMIN' = 'ADMIN',
  'STORE' = 'STORE',
  'CUSTOMER' = 'CUSTOMER',
}
interface AuthState {
  isAuthorized?: Role;
  isShowSplash: boolean;
  isShowOnBoard: boolean;
  accountInfo: {
    id: number;
    username: string;
    role: string;
    email: string;
  };

  authLoadingState: LoadingState;
  dataRegister: RegisterResponse;
}

const initialState = {
  isAuthorized: undefined,
  isShowSplash: true,
  isShowOnBoard: true,
  accountInfo: {
    id: 0,
    username: '',
    role: '',
  },

  authLoadingState: 'idle',
  dataRegister: {} as RegisterResponse,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    SetIsAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
    SetIsShowSplash: (state, action) => {
      state.isShowSplash = action.payload;
    },
    SetIsShowOnBoard: (state, action) => {
      state.isShowOnBoard = action.payload;
    },
    SetUserInforLogin: (state, action) => {
      state.accountInfo = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(register.pending, (state, action) => {
      state.authLoadingState = 'pending';
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.authLoadingState = 'fulfilled';
      console.log('action.payload', JSON.stringify(action.payload.data));
    });
    builder.addCase(register.rejected, (state, action) => {
      state.authLoadingState = 'rejected';
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      console.log('Data get user: ', JSON.stringify(action.payload.data));
      const resData: RegisterResponse = action.payload.data
        .data as unknown as RegisterResponse;
      state.accountInfo = resData;
      AppProvider.setAccountInfo(resData);
    });
    builder.addCase(setNewUsername.fulfilled, (state, action) => {
      console.log('set username', JSON.stringify(action.payload.data));
      const resData: RegisterResponse = action.payload.data
        .data as unknown as RegisterResponse;
      state.accountInfo = resData;
      AppProvider.setAccountInfo(resData);
    });
    builder.addCase(setNewEmail.fulfilled, (state, action) => {
      console.log('set email', JSON.stringify(action.payload.data));
      const resData: RegisterResponse = action.payload.data
        .data as unknown as RegisterResponse;
      state.accountInfo = resData;
      AppProvider.setAccountInfo(resData);
    });
  },
});

export default authSlice.reducer;
export const {
  SetIsAuthorized,
  SetIsShowSplash,
  SetIsShowOnBoard,
  SetUserInforLogin,
} = authSlice.actions;
export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
export const selectIsShowSplash = (state: RootState) => state.auth.isShowSplash;
export const selectIsShowOnBoard = (state: RootState) =>
  state.auth.isShowOnBoard;

export const selectAuthLoadingState = (state: RootState) =>
  state.auth.authLoadingState;
export const selectDataRegister = (state: RootState) => state.auth.dataRegister;
export const selectAccountInfo = (state: RootState) => state.auth.accountInfo;
