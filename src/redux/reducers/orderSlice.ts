import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {LoadingState, Normalized} from '~/types';
import {
  addProductToCart,
  getAllOrder,
  getCartUser,
} from '../actions/orderAction';
import {CartResponse, CartUser, OrderAdminStore} from '~/types/order';

interface OrderState {
  dataOrder: Normalized<number, any>;
  allOrder: Array<OrderAdminStore>;
  loadingAddProductToCart: LoadingState;
  dataCart: CartResponse;
}

const initialState = {
  dataOrder: {},
  loadingAddProductToCart: 'idle',
  allOrder: [{}],
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
    builder.addCase(getCartUser.pending, state => {});
    builder.addCase(getCartUser.fulfilled, (state, action) => {
      state.dataCart = action.payload.data.data;
    });
    builder.addCase(getCartUser.rejected, state => {});

    builder.addCase(addProductToCart.pending, state => {
      state.loadingAddProductToCart = 'pending';
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.loadingAddProductToCart = 'fulfilled';
    });
    builder.addCase(addProductToCart.rejected, state => {
      state.loadingAddProductToCart = 'rejected';
    });
    builder.addCase(getAllOrder.pending, state => {});
    builder.addCase(getAllOrder.fulfilled, (state, action) => {
      state.allOrder = action.payload.data.data;
    });
    builder.addCase(getAllOrder.rejected, state => {});
  },
});

export default orderSlice.reducer;
export const {setDataOrder} = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order.dataOrder;
export const selectLoadingAddProductToCart = (state: RootState) =>
  state.order.loadingAddProductToCart;
export const selectDataCart = (state: RootState) => state.order.dataCart;
export const selectAllOrder = (state: RootState) => state.order.allOrder;
