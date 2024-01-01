import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {
  AddProductToCartParams,
  CartResponse,
  CartUser,
  OrderAdminStore,
  OrderParams,
  OrderResponse,
} from '~/types/order';

export const orderService = {
  addProductToCart: (params: AddProductToCartParams) => {
    return request<CartUser>(apiUrl.addProductToCart(), Methods.post, params);
  },

  getCartUser: () => {
    return request<CartResponse>(apiUrl.getCartUser(), Methods.get, '');
  },

  deleteItemCart: (params: any) => {
    return request<CartUser>(apiUrl.deleteItemCart(), Methods.delete, params);
  },

  makeOrder: (params: OrderParams) => {
    return request<OrderResponse>(apiUrl.makeOrder(), Methods.post, params);
  },

  getAllOrder: () => {
    return request<Array<OrderAdminStore>>(
      apiUrl.getAllOrder(),
      Methods.get,
      '',
    );
  },

  getOrderUser: () => {
    return request<Array<OrderAdminStore>>(
      apiUrl.getOrderUser(),
      Methods.get,
      '',
    );
  },

  updateStatusOrder: (
    orderId: number,
    params: {
      status: 'pending' | 'delivering' | 'delivered' | 'canceled';
    },
  ) => {
    return request<any>(apiUrl.updateOrderStatus(orderId), Methods.put, params);
  },
};
