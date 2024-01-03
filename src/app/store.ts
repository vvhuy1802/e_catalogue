import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../redux/reducers/authSlice';
import homeSlice from '../redux/reducers/homeSlice';
import globalSlice from '~/redux/reducers/globalSlice';
import orderSlice from '~/redux/reducers/orderSlice';
import productSlice from '~/redux/reducers/productSlice';
import userInfo from '~/redux/reducers/userInfo';
import categorySlice from '~/redux/reducers/categorySlice';
import popupMessageSlice from '~/redux/reducers/popupMessageSlice';
import contactSlice from '~/redux/reducers/contactSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    home: homeSlice,
    global: globalSlice,
    order: orderSlice,
    product: productSlice,
    userInfo: userInfo,
    category: categorySlice,
    popupMeassage: popupMessageSlice,
    contact: contactSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
