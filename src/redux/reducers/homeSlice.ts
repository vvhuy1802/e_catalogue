import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

interface HomeState {
  dataHome: {};
}

const initialState = {
  dataHome: {},
} as HomeState;

const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {},
  //   extraReducers: {},
});

export default homeSlice.reducer;
export const {} = homeSlice.actions;
export const selectHomeData = (state: RootState) => state.home.dataHome;
