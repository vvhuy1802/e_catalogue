import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {LoadingState, Normalized} from '~/types';
import {addProductToCart, getCartUser} from '../actions/orderAction';
import {CartUser} from '~/types/order';

interface OrderState {
  dataOrder: Normalized<number, any>;
  loadingCart: LoadingState;
  dataCart: CartUser;
}

const initialState = {
  dataOrder: {},
  loadingCart: 'idle',
  dataCart: {},
} as OrderState;

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    setDataOrder: (state, action) => {
      state.dataOrder = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCartUser.pending, state => {
      state.loadingCart = 'pending';
    });
    builder.addCase(getCartUser.fulfilled, (state, action) => {
      state.loadingCart = 'fulfilled';
      console.log('Cart: ', JSON.stringify(action.payload.data.data, null, 2));
      state.dataCart = action.payload.data.data;
    });
    builder.addCase(getCartUser.rejected, state => {
      state.loadingCart = 'rejected';
    });

    builder.addCase(addProductToCart.pending, state => {});
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.dataCart = action.payload.data.data;
    });
    builder.addCase(addProductToCart.rejected, state => {});
  },
});

export default orderSlice.reducer;
export const {setDataOrder} = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order.dataOrder;
export const selectLoadingCart = (state: RootState) => state.order.loadingCart;
export const selectDataCart = (state: RootState) => state.order.dataCart;
