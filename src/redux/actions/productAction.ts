import {createAsyncThunk} from '@reduxjs/toolkit';
import {productService} from '~/services/service/product.service';

export const getAllCategories = createAsyncThunk(
  'product/getAllCategories Action',
  async () => {
    const res = await productService.getAllCategories();
    return {data: res};
  },
);
