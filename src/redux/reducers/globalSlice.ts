import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {images} from '~/assets';

interface GlobalState {
  directionBottomBar: 'idle' | 'up' | 'down';
  currentDropDown: any;
  demoImage: any;
}

const initialState = {
  directionBottomBar: 'up',
  currentDropDown: {
    id: 1,
    name: 'man',
    title: 'Man',
    img: images.home.DropDownMan,
  },
  demoImage: null,
} as GlobalState;

const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    SetDirectionBottomBar: (state, action) => {
      state.directionBottomBar = action.payload;
    },
    SetCurrentDropDown: (state, action) => {
      state.currentDropDown = action.payload;
    },
    setDemoImage: (state, action) => {
      state.demoImage = action.payload;
    },
  },
  //   extraReducers: {},
});

export default globalSlice.reducer;
export const {SetDirectionBottomBar, SetCurrentDropDown, setDemoImage} =
  globalSlice.actions;

export const selectDirectionBottomBar = (state: RootState) =>
  state.global.directionBottomBar;

export const selectCurrentDropDown = (state: RootState) =>
  state.global.currentDropDown;

export const selectDemoImage = (state: RootState) => state.global.demoImage;
