import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

interface GlobalState {
  directionBottomBar: 'idle' | 'up' | 'down';
  demoImage: any;
}

const initialState = {
  directionBottomBar: 'up',
  demoImage: null,
} as GlobalState;

const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    SetDirectionBottomBar: (state, action) => {
      state.directionBottomBar = action.payload;
    },
    setDemoImage: (state, action) => {
      state.demoImage = action.payload;
    },
  },
  //   extraReducers: {},
});

export default globalSlice.reducer;
export const {SetDirectionBottomBar, setDemoImage} = globalSlice.actions;

export const selectDirectionBottomBar = (state: RootState) =>
  state.global.directionBottomBar;

export const selectDemoImage = (state: RootState) => state.global.demoImage;
