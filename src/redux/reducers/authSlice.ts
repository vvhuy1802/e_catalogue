import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

interface AuthState {
  token: string;
}

const initialState = {
  token: '',
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  // extraReducers: builder => {},
});

export default authSlice.reducer;
export const {} = authSlice.actions;
export const selectAuthToken = (state: RootState) => state.auth.token;
