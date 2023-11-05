import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

interface AuthState {
   isAuthorized : boolean;
   isShowSplash : boolean;
   isShowOnBoard : boolean;
}

const initialState = {
    isAuthorized : false,
    isShowSplash : true,
    isShowOnBoard : true,
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
  // extraReducers: builder => {},
});

export default authSlice.reducer;
export const {
  SetIsAuthorized,
  SetIsShowSplash,
  SetIsShowOnBoard,
} = authSlice.actions;
export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
export const selectIsShowSplash = (state: RootState) => state.auth.isShowSplash;
export const selectIsShowOnBoard = (state: RootState) => state.auth.isShowOnBoard;

