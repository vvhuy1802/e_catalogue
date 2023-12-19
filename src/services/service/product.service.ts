import {apiUrl} from '../paths';
import {request} from '../axiosClient';
import {Methods} from '../method';
import {ProductCategoryResponse} from '~/types/product';

export const productService = {
  getAllCategories: () => {
    return request<ProductCategoryResponse[]>(
      apiUrl.getAllCategories(),
      Methods.get,
      '',
    );
  },
};
