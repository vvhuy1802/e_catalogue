import {createAsyncThunk} from '@reduxjs/toolkit';
import {orderService} from '~/services/service/order.service';

export const getCartUser = createAsyncThunk(
  'product/getCartUser Action',
  async () => {
    const res = await orderService.getCartUser();
    return {data: res};
  },
);

export const addProductToCart = createAsyncThunk(
  'product/addProductToCart Action',
  async (params: any) => {
    const res = await orderService.addProductToCart(params);
    return {data: res};
  },
);

export const getAllOrder = createAsyncThunk(
  'product/getAllOrder Action',
  async () => {
    const res = await orderService.getAllOrder();
    return {data: res};
  },
);
