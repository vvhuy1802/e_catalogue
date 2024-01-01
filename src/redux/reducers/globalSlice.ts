import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {images} from '~/assets';

interface GlobalState {
  directionBottomBar: 'idle' | 'up' | 'down';
  currentTab: 'Home' | 'Category' | 'StyleIdea' | 'Favorite' | 'Profile';
  currentDropDown: any;
}

const initialState = {
  directionBottomBar: 'up',
  currentDropDown: {
    id: 1,
    name: 'man',
    title: 'Men',
    img: images.home.DropDownMan,
  },
  currentTab: 'Home',
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
    setCurrentTabRedux: (state, action) => {
      state.currentTab = action.payload;
    },
  },
  //   extraReducers: {},
});

export default globalSlice.reducer;
export const {SetDirectionBottomBar, SetCurrentDropDown, setCurrentTabRedux} =
  globalSlice.actions;

export const selectDirectionBottomBar = (state: RootState) =>
  state.global.directionBottomBar;

export const selectCurrentDropDown = (state: RootState) =>
  state.global.currentDropDown;

export const selectCurrentTab = (state: RootState) => state.global.currentTab;
