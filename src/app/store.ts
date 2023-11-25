import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../redux/reducers/authSlice';
import homeSlice from '../redux/reducers/homeSlice';
import globalSlice from '~/redux/reducers/globalSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    home: homeSlice,
    global: globalSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
