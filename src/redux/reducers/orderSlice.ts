import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {Normalized} from '~/types';

interface OrderState {
  dataOrder: Normalized<number, any>;
}

const initialState = {
  dataOrder: {},
} as OrderState;

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    setDataOrder: (state, action) => {
      state.dataOrder = action.payload;
    },
  },
  //   extraReducers: {},
});

export default orderSlice.reducer;
export const {setDataOrder} = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order.dataOrder;
