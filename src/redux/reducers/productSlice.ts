import {createSlice} from '@reduxjs/toolkit';
import {LoadingState} from '~/types';
import {ProductCategoryResponse} from '~/types/product';
import {getAllCategories} from '../actions/productAction';

interface ProductState {
  loadingGetAllCategories: LoadingState;
  allCategories: ProductCategoryResponse[];
}

const initialState = {
  loadingGetAllCategories: 'idle',
  allCategories: [],
} as ProductState;

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllCategories.pending, state => {
      state.loadingGetAllCategories = 'pending';
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.loadingGetAllCategories = 'fulfilled';
      state.allCategories = action.payload.data.data;
    });
    builder.addCase(getAllCategories.rejected, state => {
      state.loadingGetAllCategories = 'rejected';
    });
  },
});

export default productSlice.reducer;
export const {} = productSlice.actions;

export const selectLoadingGetAllCategories = (state: {product: ProductState}) =>
  state.product.loadingGetAllCategories;

export const selectAllCategories = (state: {product: ProductState}) =>
  state.product.allCategories;
