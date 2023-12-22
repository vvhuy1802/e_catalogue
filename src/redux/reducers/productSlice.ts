import {createSlice} from '@reduxjs/toolkit';
import {LoadingState} from '~/types';
import {ProductCategoryResponse, ProductsByCategory} from '~/types/product';
import {
  getAllCategories,
  getProductsByCategory,
} from '../actions/productAction';

interface ProductState {
  loadingGetAllCategories: LoadingState;
  allCategories: ProductCategoryResponse[];

  loadingGetProductsByCategory: LoadingState;
  productsByCategory: ProductsByCategory;
}

const initialState = {
  loadingGetAllCategories: 'idle',
  allCategories: [],

  loadingGetProductsByCategory: 'idle',
  productsByCategory: {
    id: 0,
    name: '',
    description: '',
    image: '',
    products: [],
  },
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

    builder.addCase(getProductsByCategory.pending, state => {
      state.loadingGetProductsByCategory = 'pending';
    });
    builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
      state.loadingGetProductsByCategory = 'fulfilled';
      state.productsByCategory = action.payload.data.data;
    });
    builder.addCase(getProductsByCategory.rejected, state => {
      state.loadingGetProductsByCategory = 'rejected';
    });
  },
});

export default productSlice.reducer;
export const {} = productSlice.actions;

export const selectLoadingGetAllCategories = (state: {product: ProductState}) =>
  state.product.loadingGetAllCategories;

export const selectAllCategories = (state: {product: ProductState}) =>
  state.product.allCategories;

export const selectLoadingGetProductsByCategory = (state: {
  product: ProductState;
}) => state.product.loadingGetProductsByCategory;

export const selectProductsByCategory = (state: {product: ProductState}) =>
  state.product.productsByCategory;
