import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {register} from '../actions/authAction';
import {LoadingState} from '~/types';
import {RegisterResponse} from '~/types/auth';

enum Role {
  'ADMIN' = 'ADMIN',
  'STORE' = 'STORE',
  'CUSTOMER' = 'CUSTOMER',
}
interface AuthState {
  isAuthorized: Role;
  isShowSplash: boolean;
  isShowOnBoard: boolean;

  authLoadingState: LoadingState;
  dataRegister: RegisterResponse;
}

const initialState = {
  isAuthorized: 'CUSTOMER',
  isShowSplash: true,
  isShowOnBoard: true,

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
  },
});

export default authSlice.reducer;
export const {SetIsAuthorized, SetIsShowSplash, SetIsShowOnBoard} =
  authSlice.actions;
export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
export const selectIsShowSplash = (state: RootState) => state.auth.isShowSplash;
export const selectIsShowOnBoard = (state: RootState) =>
  state.auth.isShowOnBoard;

export const selectAuthLoadingState = (state: RootState) =>
  state.auth.authLoadingState;
export const selectDataRegister = (state: RootState) => state.auth.dataRegister;
