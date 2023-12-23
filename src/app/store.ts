import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../redux/reducers/authSlice';
import homeSlice from '../redux/reducers/homeSlice';
import globalSlice from '~/redux/reducers/globalSlice';
import orderSlice from '~/redux/reducers/orderSlice';
import userInfo from '~/redux/reducers/userInfo';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    home: homeSlice,
    global: globalSlice,
    order: orderSlice,
    userInfo: userInfo,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
