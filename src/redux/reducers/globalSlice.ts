import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

interface GlobalState {
  directionBottomBar: 'idle' | 'up' | 'down';
}

const initialState = {
  directionBottomBar: 'up',
} as GlobalState;

const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    SetDirectionBottomBar: (state, action) => {
      state.directionBottomBar = action.payload;
    },
  },
  //   extraReducers: {},
});

export default globalSlice.reducer;
export const {SetDirectionBottomBar} = globalSlice.actions;

export const selectDirectionBottomBar = (state: RootState) =>
  state.global.directionBottomBar;
