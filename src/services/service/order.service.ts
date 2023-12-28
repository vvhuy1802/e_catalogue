import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {AddProductToCartParams, CartUser} from '~/types/order';

export const orderService = {
  addProductToCart: (params: AddProductToCartParams) => {
    return request<CartUser>(apiUrl.addProductToCart(), Methods.post, params);
  },

  getCartUser: () => {
    return request<CartUser>(apiUrl.getCartUser(), Methods.get, '');
  },
};
